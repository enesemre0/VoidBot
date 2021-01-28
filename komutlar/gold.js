const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db')

exports.run = (client, message, args) => {
    let uye = message.mentions.users.first()
    const embed = new Discord.MessageEmbed()
        .setTitle("VoidBot - Başarılı")
        .setColor("GREEN")
        .setDescription("")
        .setThumbnail(uye.displayAvatarURL({dynamic: true}))
        .setFooter(uye.tag + " Artık Gold Üye!", uye.displayAvatarURL({dynamic: true}))
    if(args[0] === "ekle") {
        db.set(`gold.${uye.id}`, "gold")
        embed.setDescription(`Başarıyla ${uye} Adlı Kişiyi Gold Üyeler Listesine Ekledim!`)
        return message.channel.send(embed)
    } else if (args[0] === "sil") {
        db.delete(`gold.${uye.id}`)
        embed.setDescription(`Başarıyla ${uye} Adlı Kişiyi Gold Üyeler Listesinden Sildim!`)
        return message.channel.send(embed)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'gold',
    description: 'gold',
    usage: 'gold'
};