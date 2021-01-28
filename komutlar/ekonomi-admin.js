const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    let admin = await db.fetch(`admin.${message.author.id}`)
    let uye = message.mentions.users.first() || message.author
    let biri = message.mentions.users.first()
    let yazi = args[0]
    let bakiye = args[1]

    if(message.author.id !== "702905315674554389" || admin) return message.channel.send("Hop nereye botta yetkin yok")
    const para = new Discord.MessageEmbed()
        .setTitle("VoidBot Ekonomi - Admin Paneli")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .addField("Kullanılabilir Komutlar", "`para-ekle` - `para-sil` - `bilet-ekle` - `bilet-sil` - `admin-ekle` - `admin-sil`")
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setColor("RANDOM")
        .setTimestamp()
    await message.channel.send(para)

    if(yazi === "para-ekle") {
        if(!bakiye) return message.channel.send("Para miktarı giriniz")
        if(isNaN(bakiye)) return message.channel.send("Para miktarını sayıyla belirtiniz")
        db.add(`bakiye.${uye.id}`, bakiye)
        message.channel.send(bakiye + " miktar para yüklendi. Kime ? " + uye)
    }
    if(yazi === "para-sil") {
        if(!bakiye) return message.channel.send("Para miktarı giriniz")
        if(isNaN(bakiye)) return message.channel.send("Para miktarını sayıyla belirtiniz")
        db.subtract(`bakiye.${uye.id}`, bakiye)
        message.channel.send(bakiye + " miktar para silindi. Kimden ? " + uye)
    }
    if(yazi === "bilet-ekle") {
        if(!bakiye) return message.channel.send("Bilet miktarı giriniz")
        if(isNaN(bakiye)) return message.channel.send("Bilet miktarını sayıyla belirtiniz")
        db.add(`bilet.${uye.id}`, bakiye)
        message.channel.send(bakiye + " miktar bilet yüklendi. Kime ? " + uye)
    }
    if(yazi === "bilet-sil") {
        if(!bakiye) return message.channel.send("Bilet miktarı giriniz")
        if(isNaN(bakiye)) return message.channel.send("Bilet miktarını sayıyla belirtiniz")
        db.subtract(`bilet.${uye.id}`, bakiye)
        message.channel.send(bakiye + " miktar bilet silindi. Kimden ? " + uye)
    }
    if(yazi === "admin-ekle") {
        if(!biri) return message.channel.send("birini etiketle")
        db.set(`admin.${uye.id}`, "admin")
        message.channel.send("admine biri eklendi. Kim ? " + uye)
    }
    if(yazi === "admin-sil") {
        if(!biri) return message.channel.send("birini etiketle")
        db.delete(`admin.${uye.id}`)
        message.channel.send("adminden biri silindi. Kim ? " + uye)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ekonomi-admin'],
    permLevel: 0
}
exports.help = {
    name: 'ekonomi-panel',
    description: '',
    usage: ''
}