const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

exports.run = async (client, message, args) => {
    let meslek = await db.fetch(`meslek.${message.author.id}`)
    let meslekpara = await db.fetch(`meslekpara.${message.author.id}`)
    let meslekbilet = await db.fetch(`meslekbilet.${message.author.id}`)


    let gunluk = await db.fetch(`daily.${message.author.id}`)
    let zamans = 86400000
    let paramiktar = Math.floor(Math.random() * 500)
    let biletmiktar = Math.floor(Math.random() * 250)

    if(gunluk != null && zamans - (Date.now() - gunluk > 0)) {

        let zaman = ms(zamans - (Date.now() - gunluk))
        await message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot Ekonomi - Günlük").setColor("RED").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setDescription(`Günlük Paranı ve Biletini Zaten Almışsın, **${zaman.hours} Saat, ${zaman.minutes} Dakika, ${zaman.seconds} Saniye** Sonra Tekrar Alabilirsin.`).setTimestamp())

    } else {

        db.add(`bakiye.${message.author.id}`, paramiktar)
        db.add(`bilet.${message.author.id}`, biletmiktar)

        const embed = new Discord.MessageEmbed()
            .setTitle("VoidBot Ekonomi - Günlük")
            .setColor("GREEN")
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setDescription("Günlük Para ve Bilet")
            .addField("<:para:801037869288259624> Para", paramiktar + " TL")
            .addField("<:bilet:803606217368535041> Bilet", biletmiktar)
            .addField("<:canta:804377260543049778> Mesleğin", meslek)
            .addField("<:maas:804372421988581446> Mesleğinin Maaşı", meslekpara + " TL - " + meslekbilet + " Bilet")
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
        await message.channel.send(embed)
        db.add(`daily.${message.author.id}`, Date.now())
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['gunluk','gunlük','günluk','daily'],
    permLevel: 0
}
exports.help = {
    name: 'günlük',
    description: '',
    usage: ''
}