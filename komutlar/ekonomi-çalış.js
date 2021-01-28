const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

exports.run = async (client, message, args) => {
    let calis = await db.fetch(`calis.${message.author.id}`)
    let zamans = 10800000
    let paramiktar = Math.floor(Math.random() * 300)
    let isler2 = ['Mağaza Yöneticisi','Burger King Kasiyeri','Garson','Vale','Paketleme','Kurye','Şoför','Hademe']
    let work = isler2[Math.floor(Math.random() * isler2.length)]

    if(calis != null && zamans - (Date.now() - calis > 0)) {

        let zaman = ms(zamans - (Date.now() - calis))
        await message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot Ekonomi - Çalış").setColor("RED").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setDescription(`Çalıştığın için Yoruldun, **${zaman.hours} Saat, ${zaman.minutes} Dakika, ${zaman.seconds} Saniye** Sonra Tekrar Çalışabilirsiniz.`).setTimestamp())

    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle("VoidBot Ekonomi - Çalış")
            .setColor("GREEN")
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Bir işe girdin.")
            .addField(" Çalıştığın İş", work)
            .addField("<:para:801037869288259624> Kazandığın Para", paramiktar + " TL")
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
        await message.channel.send(embed)
        db.add(`bakiye.${message.author.id}`, paramiktar)
        db.add(`calis.${message.author.id}`, Date.now())
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['calis','calıs','çalıs','çalis','caliş','calış','work'],
    permLevel: 0
}
exports.help = {
    name: 'çalış',
    description: '',
    usage: ''
}