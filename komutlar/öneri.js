const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let kanal = client.channels.cache.get("787983363666608161")

    let oneri = args.slice(0).join(" ")
    if(!oneri) {
        message.channel.send("Lütfen Bir Öneri Yazınız!")
    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle("VoidBot - Öneri")
            .setDescription("**Yeni Öneri Geldi!**")
            .addField("Öneri", `${oneri}`)
            .addField("Öneriyi Yapan", `${message.author.tag}, ${message.author}`)
            .addField("Öneriyi Yaptığı Sunucu", `${message.guild.name}, ID: **${message.guild.id}**`)
            .addField("Öneriyi Yaptığı Kanal", `${message.channel}`)
            .setColor("GREEN")
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        kanal.send(embed)
        message.channel.send("Öneriniz Başarıyla VoidBot Yetkili Ekibine İletilmiştir!")
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["oneri"],
    permLevel: 0,
};
exports.help = {
    name: "öneri",
    description: "Bot komutlarında öneride bulunursunuz",
    usage: "&öneri öneriniz"
};