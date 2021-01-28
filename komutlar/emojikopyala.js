const Discord = require("discord.js");

exports.run = (client, message, args) => {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setDescription("Bu Komutu Kullanabilmek İçin **Yönetici** Yetkisine İhtiyacın Var!")).then(m => m.delete({timeout: 5000}));
      if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription("Emoji ID'si Giriniz! \n ID Almak İçin Emojiyi Yazın ve Emojiye Sağ Tıklayıp ID'Yi Kopyala Diyin.\nGözükmüyor ise https://support.discord.com/hc/tr/articles/206346498-Kullanıcı-Sunucu-Mesaj-ID-sini-Nerden-Bulurum-"));
      if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription("Emoji Adı Giriniz! (Boşluksuz)"));
      message.guild
        .emojis.create(`https://cdn.discordapp.com/emojis/${args[0]}`, args[1],{reason: 'VoidBot Emoji Kopyalama Sistemi' })
        .then(t => {
          message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription("Emoji Kopyalandı!"));
        })
        .catch(error => {
          message.channel.send("Hata oluştu!\n\n" + error);
        })

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emojic"],
  permLevel: 0
};

exports.help = {
  name: "emojikopyala",
  description: "",
  usage: "emojikopyala"
};