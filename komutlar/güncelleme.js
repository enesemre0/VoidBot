const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("Yeni Güncellemeler")
        .addField("OtoRol Sistemi","&otorol ayarla/sıfırla - &otorolmesaj ayarla/sıfırla")
        .addField("Sayaç Sistemi","&sayaç ayarla/sıfırla - &sayaçmesaj(Ekleniyor...)")
        .addField("Google Play Komutu","&playstore `uygulama/oyun ismi (Ekleniyor...)`")
        .setTimestamp()
        .setThumbnail(message.bot.displayAvatarURL())
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["güncellemeler","guncelleme","guncellemeler"],
    permLevel: 0
};

exports.help = {
    name: "güncelleme",
    description: "FBi gif atar",
    usage: "a!fbi"
};
