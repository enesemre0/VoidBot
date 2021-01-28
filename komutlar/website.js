const Discord = require("discord.js");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle("VoidBot - Website")
        .setDescription("Website Adresine Gitmek için [Bana Tıkla!](https://voidbot.enesemre.net/)")
        .setColor("#FFF")
        .setTimestamp()
    await message.channel.send(embed)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["voidbotsite","site","web"],
    permLevel: 0,
};
exports.help = {
    name: "website",
    description: "Yılbaşının kutlanmasına kaç gün kaç saat kaç dakika kaç saniye olduğunu gösterir.",
    usage: ""
};