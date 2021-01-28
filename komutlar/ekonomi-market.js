const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

exports.run = async (client, message, args) => {
    let para = db.fetch(`bakiye.${message.author.id}`)
    let urun = args[0]
    let kazma = await db.fetch(`kazma.${message.author.id}`)
    let silah = await db.fetch(`silah.${message.author.id}`)
    const embed = new Discord.MessageEmbed()
        .setTitle("VoidBot Ekonomi Market")
        .setThumbnail('https://cdn.discordapp.com/attachments/803602866392006658/803690008376377364/shops.png')
        .setAuthor("Ürün Almak için - &market [ürünid]")
        .setDescription(`**Ürünler**\n\n\`250 TL\` - <:kazma:803609566981259314> **Kazma** (Madenci Mesleğinde Gereklidir) - \`001\`\n\`1300 TL\` - <:silah:803609787395866665> **Silah** (Polis Mesleğinde ve Soygun Yaparken Gereklidir) - \`002\``)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter("Güncel Bakiyeniz: " + para + " TL")

    if(!urun) await message.channel.send(embed);

    if(urun === "001") {
        if(para < 250) {
            const satinalma = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setAuthor("Market Menüsüne Bakmak için `&market` Yazabilirsiniz!")
                .setDescription("Ürünü Satın Alamadınız!")
                .addField("Alınmaya Çalışan Ürün", urun.replace("001", "<:kazma:803609566981259314> **Kazma**").replace("002", "<:silah:803609787395866665> **Silah**"))
                .addField("Gerekli Bakiye", 250 - para + " TL")
                .setColor("RED")
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                .setFooter("Güncel Bakiyeniz: " + para + " TL")
            await message.channel.send(satinalma)
        } else if (kazma) {
            const satinal = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setAuthor("Market Menüsüne Bakmak için `&market` Yazabilirsiniz!")
                .setDescription("Zaten Sizde Olan Bir Ürünü Tekrar Alamazsınız!")
                .setColor("RED")
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            await message.channel.send(satinal)
        } else {
            const satinal = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setAuthor("Market Menüsüne Bakmak için `&market` Yazabilirsiniz!")
                .setDescription("Başarıyla Bir Ürün Satın Aldınız!")
                .addField("Alınan Ürün", urun.replace("001", "<:kazma:803609566981259314> **Kazma**").replace("002", "<:silah:803609787395866665> **Silah**"))
                .addField("Hesabından Kesilen Bakiye", "250 TL")
                .setColor("GREEN")
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            await message.channel.send(satinal)
            db.set(`kazma.${message.author.id}`, "<:dogru1:788333822223712257>")
            db.subtract(`bakiye.${message.author.id}`, 250)
        }
    } else if (urun === "002") {
        if(para < 1300) {
            const satinalma = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setAuthor("Market Menüsüne Bakmak için `&market` Yazabilirsiniz!")
                .setDescription("Ürünü Satın Alamadınız!")
                .addField("Alınmaya Çalışan Ürün", urun.replace("001", "<:kazma:803609566981259314> **Kazma**").replace("002", "<:silah:803609787395866665> **Silah**"))
                .addField("Gerekli Bakiye", 1300 - para + " TL")
                .setColor("RED")
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                .setFooter("Güncel Bakiyeniz: " + para + " TL")
            await message.channel.send(satinalma)
        } else if (silah) {
            const satinal = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setAuthor("Market Menüsüne Bakmak için `&market` Yazabilirsiniz!")
                .setDescription("Zaten Sizde Olan Bir Ürünü Tekrar Alamazsınız!")
                .setColor("RED")
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            await message.channel.send(satinal)
        } else {
            const satinal = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setAuthor("Market Menüsüne Bakmak için `&market` Yazabilirsiniz!")
                .setDescription("Başarıyla Bir Ürün Satın Aldınız!")
                .addField("Alınan Ürün", urun.replace("001", "<:kazma:803609566981259314> **Kazma**").replace("002", "<:silah:803609787395866665> **Silah**"))
                .addField("Hesabından Kesilen Bakiye", "1300")
                .setColor("GREEN")
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            await message.channel.send(satinal)
            db.set(`silah.${message.author.id}`, "<:dogru1:788333822223712257>")
            db.subtract(`bakiye.${message.author.id}`, 1300)
        }
    } else {
        if(urun) {
            const hata = new Discord.MessageEmbed()
                .setTitle("VoidBot Ekonomi Market")
                .setDescription("Lütfen Doğru Bir Ürün Kodu Giriniz!")
                .setColor("RED")
            await message.channel.send(hata)
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['store','em','e-m'],
    permLevel: 0
}
exports.help = {
    name: 'market',
    description: '',
    usage: ''
}