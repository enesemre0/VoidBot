const express = require('express')
const moment = require("moment");
moment.locale("tr");

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");
const fs = require("fs");
const db = require("quick.db");
const ms = require("parse-ms");
require("moment-duration-format");
require("./util/eventLoader")(client);
const app = express();
const log = message => {
  console.log(`${moment().format("DD MMMM YYYY HH:mm")} ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return;
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.member.id == message.guild.owner.id) permlvl = 4;
  return permlvl;
};

// KODLAR BURADAN SONRA \\

client.login(ayarlar.token);
client.on("message", async message => {
  if (message.content.startsWith(ayarlar.prefix)) return;
});
client.on("message", async msg => {
  if (!msg.guild) return;
  if (msg.content.startsWith(ayarlar.prefix + "afk")) return;

  let afk = msg.mentions.users.first();

  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`);

  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`);
  if (afk) {
    const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`);
    const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`);
    if (msg.content.includes(kisi3)) {
      const enesemre = new Discord.MessageEmbed()
        .setDescription(msg.author.tag + ", Etiketlediğiniz Kişi **AFK**\nSebep: **" + sebep + "**")
        .setColor("RANDOM")
        .setTimestamp()
      await msg.channel.send(enesemre);
    }
  }
  if (msg.author.id === kisi) {
    const enesemre = new Discord.MessageEmbed()
      .setTitle("Çevrimiçi Olma")
      .setDescription("Afk'lıktan çıktınız!")
      .setTimestamp()
      .setColor("RANDOM")
    await msg.channel.send(enesemre);
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`);
    await msg.member.setNickname(isim);
  }
});
client.on("guildMemberAdd", async member => {
  const data = require("quick.db");
  const asd = data.fetch(`${member.guild.id}.jail.${member.id}`);
  if (asd) {
    let data2 = await data.fetch(`jailrol_${member.guild.id}`);
    let rol = member.guild.roles.cache.get(data2);
    if (!rol) return;
    let kişi = member.guild.members.cache.get(member.id);
    await kişi.roles.add(rol.id);
    kişi.roles.cache.forEach(r => {
      kişi.roles.remove(r.id);
      data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id);
    });
    data.set(`${member.guild.id}.jail.${kişi.id}`, "codare");
    const wasted = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
      .setColor(`#f3c7e1`)
      .setDescription(`Aa, beni kandıramazsın!`)
      .setTimestamp();
    await member.send(wasted);
  }
});
client.on("guildMemberAdd", async member => {
  let mute = member.guild.roles.cache.find(r => r.name === "Susturuldu");
  let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`);
  let sure = db.fetch(`süre_${member.id + member.guild.id}`);
  if (!mutelimi) return;
  if (mutelimi === "muteli") {
    await member.roles.add(mute.id);

    await member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!");
    setTimeout(() => {
      // msg.channel.send(`<@${user.id}> Muten açıldı.`)
      db.delete(`muteli_${member.guild.id + member.id}`);
       member.send(`<@${member.id}> Muten açıldı.`);
       member.roles.remove(mute.id);
    }, ms(sure));
  }
});

client.on("message", async msg => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      await msg.reply("Aleyküm Selam Hoşgeldin^^");
    }
    if (msg.content.toLowerCase() === "selam") {
      await msg.reply("Selam :)");
    }
    if (msg.content.toLowerCase() === "sea") {
      await msg.reply("Aleyküm Selam Hoşgeldin^^");
    }
    if (msg.content.toLowerCase() === "selamün aleyküm") {
      await msg.reply("Aleyküm Selam Hoşgeldin^^");
    }
    if (msg.content.toLowerCase() === "selamun aleyküm") {
      await msg.reply("Aleyküm Selam Hoşgeldin^^");
    }
    if (msg.content.toLowerCase() === "selamun aleykum") {
      await msg.reply("Aleyküm Selam Hoşgeldin^^");
    }
  } else return;

  if (!msg.guild) return;
});
client.on('messageDelete', message => {
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
});

client.on('guildMemberAdd', async member => {
  let durumu = await db.fetch(`otoroldurum_${member.guild.id}.otorol.durum`)
  if(durumu === "acik") {
    let rol = await db.fetch(`otorol_${member.guild.id}`)
    let kanal = await db.fetch(`otorolkanal_${member.guild.id}`)
    let mesaj = await db.fetch(`otorolmesaj_${member.guild.id}`) || `${member} Adlı Kullanıcı Sunucuya **Katıldı!** Onunla Birlikte **${member.guild.memberCount}** Kişi Olduk!`

    await member.roles.add(rol)
    let kanals = member.guild.channels.cache.get(kanal)
    kanals.send(mesaj.replace('%üye%', `${member}`).replace('%sunucuismi%', member.guild.name).replace('%üyesayısı%', member.guild.memberCount.toString()).replace('%rol%', '<@&'+rol+'>'))
  } else return;
});
/*client.on('guildMemberRemove', async member => {
  let durumu = await db.fetch(`otoroldurum_${member.guild.id}.otorol.durum`)
  if(durumu === "acik") {
    let kanal = await db.fetch(`otorolkanal_${member.guild.id}`)
    let mesaj = `**${member.user.tag}** Adlı Kullanıcı Sunucudan **Ayrıldı!** **${member.guild.memberCount}** Kişi Kaldık!`
    let kanals = member.guild.channels.cache.get(kanal)
    kanals.send(mesaj)
  } else return;

});*/

/*client.on('message', async message => {
  let timeout = 600000
  let enes = await db.fetch(`enesd_${message.author.id}`);
  let kurucu = "kurucuid";
  if (message.author.id === kurucu) {
    if (enes !== null && timeout - (Date.now() - enes) > 0) {
      let time = ms(timeout - (Date.now() - enes));
    } else {
        db.set(`enesd_${message.author.id}`, Date.now());
        message.channel.send(new Discord.MessageEmbed().setDescription("Sahibim gelmiş hoş gelmiş").setFooter("BOTİSMİ Bot Yapımcısı").setColor("GOLD")).then(a => a.delete({timeout: 5000}))
    }
  }
});*/
client.on('guildCreate', async guild => {
  let kanal = "796464249345015848";
  let owner = client.users.cache.get(guild.ownerID)
  let enesemre = new Discord.MessageEmbed()
      .setTitle("Bir Sunucuya Eklendim!")
      .addField("Sunucu Adı:", guild.name)
      .addField("Sunucu ID:", guild.id)
      .addField("Sunucu Sahibi:", owner.tag)
      .addField("Sunucu Üye Sayısı:", guild.memberCount)
      .setThumbnail(guild.iconURL({dynamic: true}))
      .setColor("GREEN")
  client.channels.cache.get(kanal).send(enesemre).catch(err => console.log("Kanala mesaj atamıyorum!"))
});
client.on('guildDelete', async guild => {
  let kanal = client.channels.cache.get("796464249345015848");
  let owner = client.users.cache.get(guild.ownerID)
  let enesemre = new Discord.MessageEmbed()
      .setTitle("Bir Sunucudan Atıldım!")
      .addField("Sunucu Adı:", guild.name)
      .addField("Sunucu ID:", guild.id)
      .addField("Sunucu Sahibi:", owner.tag)
      .addField("Sunucu Üye Sayısı:", guild.memberCount)
      .setThumbnail(guild.iconURL({dynamic: true}))
      .setColor("RED")
  kanal.send(enesemre).catch(err => kanal.send(err))
});

client.on("message", async message => {
  if(!message.guild) return;
  if(message.content.startsWith("<@"+ client.user.id + ">")) {
    const embed = new Discord.MessageEmbed()
        .setTitle("VoidBot")
        .setDescription("Merhaba, Ben VoidBot! - Prefix'im `&`")
        .setColor("GOLD")
        .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    await message.channel.send(embed).then(m => {
      m.delete({timeout: 5000})
    })
  }
});

client.on('message',async message => {
  let goldmu = db.get(`gold.${message.author.id}`);
  let enes = db.fetch(`goldsüre.${message.author.id}`)
  if(db.has(`gold.${message.author.id}`) == false) return;

  let timeout = 300000
  if (message.content.length >= 1) {
    const embed = new Discord.MessageEmbed()
        .setTitle('Gold Üye Belirdi!')
        .setDescription('Hizzaya Geçin, Burda Bir Gold Üye Belirdi!')
        .setColor('GOLD')
    if (enes !== null && timeout - (Date.now() - enes) > 0) {
      let time = ms(timeout - (Date.now() - enes));
    } else {
      await message.channel.send(embed).then(a => {
        setTimeout(() => {
          a.delete()
        }, 7000)
      })
      db.set(`goldsüre.${message.author.id}`, Date.now());
    }
  }
});
const captcha = require("captcha-plus");

client.on("guildMemberAdd", async(member) => {
  captcha.create(member.id);
  member.send(new Discord.MessageEmbed().setThumbnail(captcha.convert(captcha.user(member.id).code).base64).setDescription("Doğrulama Kanalına Bu Kodu Yazın!"))
});

client.on("message", async(msg) => {
  if(msg.channel.id !== "803714150970556426") return;
  let member = msg.guild.members.cache.find(r => r.id == msg.author.id)
  if(captcha.check(msg.author.id, msg.content)) return member.roles.add("804379578088554517");
});
