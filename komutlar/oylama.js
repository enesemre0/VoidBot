const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send("Bu komutu kullanabilmek için `Mesajları Yönet` iznine ihtiyacın var.")
        }
        let emoji1 = "<a:evetgif:787990148225957909>"
        let emoji2 = "<a:hayirgif:787990150331760641>"
        let oyla = args.slice(0).join(' ')
    
    if(!oyla) return message.reply('Neyi oylayacağımı yazmadın.')

        const enesemre = new Discord.MessageEmbed()
        .setDescription("`"+oyla + "` \n\n**Oylama Başladı, Oylamak için emojilere tıklayabilirsiniz!**")
    .setColor('BLACK')
        message.channel.send(enesemre).then(enes => enes.react(emoji1) + enes.react(emoji2))
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oylama','oylama-yap'],
    permLevel: 0
}

exports.help = {
    name: 'oyla'
}