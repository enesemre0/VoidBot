const Discord = require('discord.js');
const gplay = require('google-play-scraper')

exports.run = (client, message, args) => {
    let uygulama = args[0]
    if(!uygulama) return message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot - Play Store").setDescription("**Lütfen Bir `Uygulama/Oyun İsmi` Giriniz.**\nÖrnek: `&playstore Instagram`"))

    gplay.search({term: uygulama, fullDetail: true, lang: 'tr'}).then((x) => {
        const uyga = x[0]

        gplay.app({appId: uyga.appId, lang: 'tr', country: 'tr'}).then((uyg) => {
            let parali = uyg.price
            let reklam = uyg.adSupported

            if(parali === 0) {
                parali = "Bedava"

            } else {
                parali = uyg.priceText
            }
            if(reklam === true) {
                reklam = "Evet"
            } else {
                reklam = "Hayır"
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(uyg.title)
                .setThumbnail(uyg.icon)
                .addField("<:yildiz:801037870622048266> Play Store Puanı", uyg.scoreText, true)
                .addField("<:gelistirici:801037868029837360> Geliştirici", uyg.developer, true)
                .addField("<:para:801037869288259624> Kaç Para?", parali, true)
                .addField("<:indirme:801037869006323713> İndirme Sayısı", uyg.installs, true)
                .addField("<:reklam:801037867853938728> Reklam İçeriyor Mu ?", reklam, true)
                .addField("<:menu:790542260545781760> Kategori", uyg.genre, true)
                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(embed)
        })
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['playstore','gp'],
    permLevel: 0
};

exports.help = {
    name: 'googleplay',
    description: 'a',
    usage: 'a'
};