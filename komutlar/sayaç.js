const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const hataembed = new Discord.MessageEmbed()
        .setTitle("VoidBot Sayaç - Hata!")
        .setDescription("Hata")
        .setColor("RED")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    const basarili = new Discord.MessageEmbed()
        .setTitle("VoidBot Sayaç - Başarılı")
        .setDescription("Başarılı")
        .setColor("GREEN")
        .setFooter(message.author.tag + " Tarafından Kullanıldı", message.author.displayAvatarURL({dynamic: true}))

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        hataembed.setDescription("Bu Komutu Kullanabilmek İçin **Yönetici** Yetkisine Sahip Olman Gerekir.")
        await message.channel.send(hataembed).then(a => a.delete({timeout: 10000}))
    }

    let islem = args[0]
    let kanal = message.mentions.channels.first()
    let hedef = args[2]
    if (islem === "sıfırla") {
        if (db.has(`sayac_${message.guild.id}`) === true) {
            db.delete(`sayac_${message.guild.id}`)

            if (db.has(`sayackanal_${message.guild.id}`) === true) {
                db.delete(`sayackanal_${message.guild.id}`)

                basarili.setDescription("Başarıyla Sayaç Kanalını ve Hedefi Sıfırladın!")
                await message.channel.send(basarili)
            } else {
                basarili.setDescription("Sayaç Hedefi Başarıyla Sıfırlandı!")
                await message.channel.send(basarili)
            }
        } else {
            hataembed.setDescription("Sayaç Hedefi ve Kanal Zaten Ayarlanmamış!")
            await message.channel.send(hataembed)
        }
        db.delete(`sayacd_${message.guild.id}`)
    } else if (!islem) {
        hataembed.setDescription("Bir İşlem Belirtmelisiniz.\nÖrnek: **&sayaç ayarla #kanal `hedef üye sayısı`**")
        await message.channel.send(hataembed).then(a => a.delete({timeout: 10000}))
    } else if (islem){
        if (!kanal) {
            hataembed.setDescription("Bir Kanal Etiketlemelisiniz.")
            await message.channel.send(hataembed).then(a => a.delete({timeout: 10000}))
        } else {
            if (!hedef) {
                hataembed.setDescription("Lütfen Hedef Kullanıcı Sayısı Giriniz ve Sadece Sayı Olarak Belirtiniz.")
                await message.channel.send(hataembed).then(a => a.delete({timeout: 10000}))

            } else if(isNaN(hedef)) {
                hataembed.setDescription("Lütfen Hedef Kullanıcı Sayısı Giriniz ve Sadece Sayı Olarak Belirtiniz.")
                await message.channel.send(hataembed).then(a => a.delete({timeout: 10000}))

            } else if(hedef <= message.guild.memberCount){
                hataembed.setDescription("Lütfen Kullanıcı Sayısından Daha Fazla Bir Sayı Giriniz!")
                await message.channel.send(hataembed).then(a => a.delete({timeout: 10000}))

            } else {
                basarili.setDescription(`Sayaç Başarıyla Ayarlandı!`)
                basarili.addField("Sayaç Kanalı",`<#${kanal.id}>`)
                basarili.addField("Sayaç Hedefi",`${hedef}`)
                db.set(`sayackanal_${message.guild.id}`, `${kanal}`)
                db.set(`sayac_${message.guild.id}`, hedef)
                db.set(`sayacd_${message.guild.id}`, 1)
                await message.channel.send(basarili)
            }
        }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sayac'],
    permLevel: 0
}
exports.help = {
    name: 'sayaç',
    description: '',
    usage: '&sayaç ayarla/sıfırla'
}