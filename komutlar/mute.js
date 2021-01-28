const Discord = require("discord.js");
const moment = require('moment');
const ms = require("parse-ms");
const db = require("quick.db");
moment.locale('tr');

exports.run = async (receivedMessage, msg, args) => {
  let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[0]));
  if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.channel.send("Bu komudu kullanabilmek için `Ban` yetkisine sahip olmanız gerek.");
  let log = await db.fetch(`mlog_${msg.guild.id}`)
  if (!log) return msg.channel.send("<a:hayirgif:787990150331760641> Ayarlı Bir Mute Log Kanalı Yok! Ayarlamak için \`&mute-log #kanal\` !")
  let mod = msg.author
  let reason = args[1]
  let sebep = args.slice(2).join(' ')

  if (!user) return msg.reply('<a:hayirgif:787990150331760641> Kullanıcı Etiketlemedin')
  if (!reason) return msg.reply('<a:hayirgif:787990150331760641> Süre Belirtmedin! Seçenekler: 1s/1m/1h/1d/1w')
  if (!sebep) return msg.reply('<a:hayirgif:787990150331760641> Sebep Belirtmedin!')



  let mute = msg.guild.roles.cache.find(r => r.name === "Susturuldu");

  let mutetime = args[1]
  if (!mute) {
    mute = await msg.guild.roles.create({
      name: "Susturuldu",
      color: "#818386",
      permissions: []
    });
    let rol = mute;
    await rol.edit({
      name: "Susturuldu"
    })
    msg.guild.channels.cache.forEach(async (channel, id) => {
      await channel.createOverwrite(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });

  }


  await (user.roles.add(mute.id));
  let mutezaman = args[1]
    .replace(`s`, " Saniye")
    .replace(`m`, " Dakika")
    .replace(`h`, " Saat")
    .replace(`d`, " Gün")
    .replace(`w`, " Hafta")
  msg.channel.send(`<a:evetgif:787990148225957909> ${user} Adlı Kişi , ${mutezaman} Susturuldu! Sunucudan Çıkarsa Bile Mutesi Devam edecek!`)
  db.set(`muteli_${msg.guild.id + user.id}`, 'muteli')
  db.set(`süre_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)

  const muteembed = new Discord.MessageEmbed()
    .setTitle('Ceza: Mute')
    .setThumbnail(user.avatarURL || user.defaultAvatarURL)
    .addField('Moderatör', `${mod}`, true)
    .addField('Sebep', `\`${sebep}\``, true)
    .addField('Kullanıcı', `<@${user.id}>`, true)
    .addField('Süre', `\`${mutezaman}\``)
    .setColor("RANDOM")
  msg.guild.channels.cache.get(log).send(muteembed)

  setTimeout(function () {
    db.delete(`muteli_${msg.guild.id + user.id}`)
    user.roles.remove(mute.id)
    msg.channel.send(`<@${user.id}> Muten açıldı.`)
  }, ms(mutetime));

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "",
  usage: ""
};