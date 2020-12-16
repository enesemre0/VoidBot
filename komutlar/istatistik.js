const Discord = require("discord.js");

exports.run = (client, message) => {

let bilgi = new Discord.MessageEmbed()
  
    .setThumbnail(client.user.avatarURL())
    .setAuthor(client.user.username, client.user.avatarURL)
    .addField(
      "Veriler", 
      `<a:sagok:706147013250514966> Toplam sunucu: **${
        client.guilds.cache.size
      }** \n<a:sagok:706147013250514966> Toplam kullanıcı: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}** \n<a:sagok:706147013250514966> Toplam kanal: **${
        client.channels.cache.size
      }**`
    ) 
    .addField(
      "Bot Geliştiricisi",
      `<a:sagok:706147013250514966> Bot geliştiricisi <@702905315674554389> | **EnesEmre**`
    ) 
    .addField(
      "Sürümler",
      `<:bilgi:788333831437418496> Discord.js sürümü: **v${Discord.version}** \n<:bilgi:788333831437418496> Node.js sürümü: **${process.version}**`
    ) 
    .addField(
      "Gecikmeler",
      `<:bilgi:788333831437418496> Bot pingi: **${
        client.ws.ping
      }** \n<a:sagok:706147013250514966> Mesaj gecikmesi: **${new Date().getTime() -
        message.createdTimestamp}**`
    )
    
    .setTimestamp()
    .setColor("RANDOM");
  message.channel.send(bilgi);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["istatistik", "i"]
};

exports.help = {
  name: "istatistik",
  description: "Türkiyenin Saatini Gösterir ",
  usage: "gç"
};