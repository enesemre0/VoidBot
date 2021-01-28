const Discord = require("discord.js");
const moment = require('moment');
moment.locale('tr');

exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    embed.setTitle("Hata!").setColor("RED").setTimestamp().setDescription("<a:hayirgif:787990150331760641> Bu Komutu Kullanabilmek İçin **Üyeleri At** İznine İhtiyacın Var.")
    return message.channel.send(embed);
  }
  if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
    embed.setTitle("Hata!").setColor("RED").setTimestamp().setDescription("<a:hayirgif:787990150331760641> Üyeleri At Yetkim Olmadığından Bu Komutu Kullanamamaktayım.")
    return message.channel.send(embed);
  }

  const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (!args[0]) {
    embed.setTitle("Hata!").setColor("RED").setTimestamp().setDescription("<a:hayirgif:787990150331760641> Kimi Kickleyeceğimi Yazmadın.")
    return message.channel.send(embed);
  }

  if (!uye) {
    embed.setTitle("Hata!").setColor("RED").setTimestamp().setDescription("<a:hayirgif:787990150331760641> Kicklemek İstediğin Kullanıcı Bulunamıyor.")
    return message.channel.send(embed);
  }
  if (!uye.kickable) {
    embed.setTitle("Hata!").setColor("RED").setTimestamp().setDescription("<a:hayirgif:787990150331760641> Bu Kullanıcı Kicklenemez. Mod & Yönetici Oldukları İçin Yada Rolleri Benimkinden Daha Yüksek Olduğundan Kickleyememekteyim.")
    return message.channel.send(embed);
  }

  if (uye.id === message.author.id) {
    embed.setTitle("Hata!").setColor("RED").setTimestamp().setDescription("<a:hayirgif:787990150331760641> Kendini Kickleyemezsin :D?")
    return message.channel.send(embed);
  }
  let sebep = args.slice(1).join(" ");

  if (sebep === undefined) sebep = "Sebep Belirtilmemiş.";

  uye.kick(sebep).catch(err => {
    if (err) return message.channel.send("Bazı Şeyler Ters Gitti.");
  });

  const kickembed = new Discord.MessageEmbed()
      .setTitle("Bir kullanıcı atıldı!")
      .setThumbnail(uye.user.displayAvatarURL({dynamic: true}))
      .addField("Atılan Kişi", uye.tag)
      .addField("Komutu Uygulayan Kişi", message.author)
      .addField("Sebebi", sebep)
      .setFooter("Atıllan Kişi", client.user.displayAvatarURL())
      .setTimestamp()
      .setColor("GREEN");

  return message.channel.send(kickembed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick"],
  permLevel: 0
};

exports.help = {
  name: "kick",
  description: "kick ",
  usage: "kick"
};
