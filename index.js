const http = require("http");
const express = require("express");
const moment = require("moment");
moment.locale("tr");
const app = express();
app.get("/", (request, response) => {
  console.log(moment().format("LLLL") + " BERK //\\ CE");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

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

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${moment().format("DD MMMM YYYY HH:mm")} ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yükleniyor;`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut: ${props.help.name}`);
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
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

// KODLAR BURADAN SONRA \\

client.login(process.env.TOKEN);

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
      msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`);
    }
  }
  if (msg.author.id === kisi) {
    msg.reply(`Afk'lıktan Çıktınız`);
    db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkid_${msg.author.id}_${msg.guild.id}`);
    db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`);
    msg.member.setNickname(isim);
  }
});
client.on('guildMemberAdd', async member => {// chimp ᵈ♡#0110
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.get(data2)
if(!rol) return;
let kişi = member.guild.members.get(member.id)
kişi.addRole(rol.id);
kişi.roles.forEach(r => {
kişi.removeRole(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`, 'codare')
  const wasted = new Discord.RichEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL)
  .setColor(`#f3c7e1`)
  .setDescription(`Aa, beni kandıramazsın!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})// codare
client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "Susturuldu");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})