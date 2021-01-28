const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
exports.run = (client, message, args) => {

  let Renk = args[0];
  let hata = args[0];
  
  let renkResimi = `https://dummyimage.com/850x850/${Renk}&text=VoidBot`;

  if (!hata) {
    const renkYok = new Discord.MessageEmbed()
      .setColor("RED")
  .setDescription(`Lütfen Bir Renk Belirtin!\nÖrnek: \`${ayarlar.prefix}renk ffffff\``)
      .setThumbnail(client.user.avatarURL())
      .setTimestamp();
    return message.channel.send(renkYok);
  }
  if(Renk.length > 6) {
    return message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot - Hata").setDescription("Lütfen 6 haneli bir renk kodu giriniz!"))
  }
  if (Renk) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(Renk)
        .setTitle(`**${args[0]} Rengi**`)
        .setURL(renkResimi)
        .setImage(renkResimi)
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['renk','renk-ara'],
  permLevel: 0
}; 

exports.help = {
  name: "renkara",
  description: "Belirttiğiniz renk kodunu aratır.",
  usage: "renk #ffffff"
};