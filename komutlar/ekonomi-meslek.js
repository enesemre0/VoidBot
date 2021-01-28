const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let meslek = args[0]
    let meslek2 = await db.fetch(`meslek.${message.author.id}`) || "Mesleği Yok"
    let meslekpara = await db.fetch(`meslekpara.${message.author.id}`) || "0"
    let meslekbilet = await db.fetch(`meslekbilet.${message.author.id}`) || "0"
    let para = await db.fetch(`bakiye.${message.author.id}`)
    let bilet = await db.fetch(`bilet.${message.author.id}`)
    const embed = new Discord.MessageEmbed()
        .setTitle("VoidBot Ekonomi - Meslek")
        .setColor("RANDOM")
        .setAuthor("Meslek Sahibi Olmak için &meslek [meslekismi] Yazabilirsiniz")
        .setTimestamp()
        .setFooter(message.author.tag + " - Güncel Bakiyeniz: " + para, message.author.displayAvatarURL())
        .addField("<:madenci:804319185839718490> Madenci (Madenci Kazması Gereklidir)", "Maliyet: **450 TL/70 Bilet** \nKazandığı Para: **Günlük 150TL - 10 Bilet**", true)
        .addField("<:trafikpolisi:804320888908546049> Trafik Polisi(Hiçbirşey Gerekli Değildir)", "Maliyet: **750 TL/130 Bilet**\n Kazandığı Para: **Günlük 270 TL - 25 Bilet**", true)
        .addField("<:polis:804320408593367050> Polis (Silah Gereklidir)", "Maliyet: **900 TL/320 Bilet**\nKazandığı Para: **Günlük 450TL - 50 Bilet**", true)
        .addField("᲼","᲼")
        .addField("<:canta:804377260543049778> Mesleğin", meslek2, true)
        .addField("<:maas:804372421988581446> Mesleğinin Maaşı", meslekpara + " TL - " + meslekbilet + " Bilet", true)
    if (!meslek && meslek2) await message.channel.send(embed)
    if(meslek2) {
        if(meslek) {
            message.channel.send("Zaten Bir Meslektesin! Başka bir mesleğe geçmeden Önce Mesleğinden `&meslek-ayrıl` Komutu ile Ayrılman Gerekli!")
        }
    } else if (!meslek2) {
        if (meslek === "madenci" || "miner") {
            if (meslek) {
                if (para < 450) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setDescription("Madenci Mesleğine Atanmak için Yeterli Paran Bulunmuyor!")
                        .addField("Gereken Para", 450 - para)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                } else if (bilet < 200) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setDescription("Madenci Mesleğine Atanmak için Yeterli Biletin Bulunmuyor!")
                        .addField("Gereken Bilet", 70 - bilet)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                } else if (para < 450 && bilet >= 200) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setAuthor("Mesleklere Bakmak için &meslek Yazabilirsiniz")
                        .setTimestamp()
                        .setDescription("Başarıyla Bir Mesleğe Atandınız!")
                        .addField("Atanılan Meslek", "Madenci")
                        .addField("Hesabınızdan Kesilen Bilet", "70")
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                    db.set(`meslek.${message.author.id}`, "<:madenci:804319185839718490> Madenci")
                    db.subtract(`bilet.${message.author.id}`, 70)
                    db.set(`meslekpara.${message.author.id}`, 150)
                    db.set(`meslekbilet${message.author.id}`, 10)
                } else {
                    if (meslek) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("VoidBot Ekonomi - Meslek")
                            .setColor("RANDOM")
                            .setAuthor("Mesleklere Bakmak için &meslek Yazabilirsiniz")
                            .setTimestamp()
                            .setDescription("Başarıyla Bir Mesleğe Atandınız!")
                            .addField("Atanılan Meslek", "Madenci")
                            .addField("Hesabınızdan Kesilen Para", "450")
                            .setFooter(message.author.tag, message.author.displayAvatarURL())
                        await message.channel.send(embed)
                        db.set(`meslek.${message.author.id}`, "<:madenci:804319185839718490> Madenci")
                        db.subtract(`bakiye.${message.author.id}`, 450)
                        db.set(`meslekpara.${message.author.id}`, 150)
                        db.set(`meslekbilet${message.author.id}`, 10)
                    }
                }
            }
        } else if (meslek === "polis" || "police") {
            if (meslek) {
                if (para < 900) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setDescription("Polis Mesleğine Atanmak için Yeterli Paran Bulunmuyor!")
                        .addField("Gereken Para", 900 - para)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                } else if (bilet < 500) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setDescription("Polis Mesleğine Atanmak için Yeterli Biletin Bulunmuyor!")
                        .addField("Gereken Bilet", 320 - bilet)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                } else if (para < 900 && bilet >= 500) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setAuthor("Mesleklere Bakmak için &meslek Yazabilirsiniz")
                        .setTimestamp()
                        .setDescription("Başarıyla Bir Mesleğe Atandınız!")
                        .addField("Atanılan Meslek", "Polisi")
                        .addField("Hesabınızdan Kesilen Bilet", "320")
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                    db.set(`meslek.${message.author.id}`, "<:polis:804320408593367050> Polis")
                    db.subtract(`bilet.${message.author.id}`, 320)
                    db.set(`meslekpara.${message.author.id}`, 450)
                    db.set(`meslekbilet${message.author.id}`, 50)
                } else {
                    if (meslek) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("VoidBot Ekonomi - Meslek")
                            .setColor("RANDOM")
                            .setAuthor("Mesleklere Bakmak için &meslek Yazabilirsiniz")
                            .setTimestamp()
                            .setDescription("Başarıyla Bir Mesleğe Atandınız!")
                            .addField("Atanılan Meslek", "Polisi")
                            .addField("Hesabınızdan Kesilen Para", "900")
                            .setFooter(message.author.tag, message.author.displayAvatarURL())
                        await message.channel.send(embed)
                        db.set(`meslek.${message.author.id}`, "<:polis:804320408593367050> Polis")
                        db.subtract(`bakiye.${message.author.id}`, 900)
                        db.set(`meslekpara.${message.author.id}`, 450)
                        db.set(`meslekbilet${message.author.id}`, 50)
                    }
                }
            }
        } else if (meslek === "trafik polisi" || "trafik-polisi" || "trafikpolisi") {
            if (meslek) {
                if (para < 750) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setDescription("Trafik Polisi Mesleğine Atanmak için Yeterli Paran Bulunmuyor!")
                        .addField("Gereken Bilet", 750 - para)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                } else if (bilet < 350) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setDescription("Trafik Polisi Mesleğine Atanmak için Yeterli Biletin Bulunmuyor!")
                        .addField("Gereken Bilet", 130 - bilet)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                } else if (para < 750 && bilet >= 350) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle("VoidBot Ekonomi - Meslek")
                        .setColor("RANDOM")
                        .setAuthor("Mesleklere Bakmak için &meslek Yazabilirsiniz")
                        .setTimestamp()
                        .setDescription("Başarıyla Bir Mesleğe Atandınız!")
                        .addField("Atanılan Meslek", "Trafik Polisi")
                        .addField("Hesabınızdan Kesilen Bilet", "130")
                        .setFooter(message.author.tag, message.author.displayAvatarURL())
                    await message.channel.send(embed)
                    db.set(`meslek.${message.author.id}`, "<:trafikpolisi:804320888908546049> Trafik Polisi")
                    db.subtract(`bilet.${message.author.id}`, 130)
                    db.set(`meslekpara.${message.author.id}`, 270)
                    db.set(`meslekbilet${message.author.id}`, 25)
                } else {
                    if (meslek) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle("VoidBot Ekonomi - Meslek")
                            .setColor("RANDOM")
                            .setAuthor("Mesleklere Bakmak için &meslek Yazabilirsiniz")
                            .setTimestamp()
                            .setDescription("Başarıyla Bir Mesleğe Atandınız!")
                            .addField("Atanılan Meslek", "Trafik Polisi")
                            .addField("Hesabınızdan Kesilen Para", "750")
                            .setFooter(message.author.tag, message.author.displayAvatarURL())
                        await message.channel.send(embed)
                        db.set(`meslek.${message.author.id}`, "<:trafikpolisi:804320888908546049> Trafik Polisi")
                        db.subtract(`bakiye.${message.author.id}`, 750)
                        db.set(`meslekpara.${message.author.id}`, 270)
                        db.set(`meslekbilet${message.author.id}`, 25)
                    }
                }
            }
        }
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['meslekler','iş'],
    permLevel: 0
}
exports.help = {
    name: 'meslek',
    description: '',
    usage: ''
}