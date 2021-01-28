const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
const prefix = ayarlar.prefix

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.reply(`<a:hayirgif:787990150331760641> Bu Komutu Kullanabilmek İçin **Kullanıcı Adlarını Yönet** İznine İhtiyacınız Var!`)
    let isim = args.slice(1).join(' ');
    let kullanici = message.mentions.users.first();

    if(!kullanici) return message.channel.send(
        new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('VoidBot - Hata')
            .setDescription('İsmini Değiştireceğin Kişiyi Etiketlemelisin.')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    )

    if(!isim) return message.channel.send(
        new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('VoidBot - Hata')
            .setDescription(kullanici + ' Adlı Kişinin Yeni İsmini Yazmalısın.')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    )

    const enesemre = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('VoidBot - İsim Değiştirme')
        .addField('İsmi Değiştirilen', `${kullanici.username}`)
        .setTimestamp()
        .setFooter('İsim Değiştiriliyor...')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    return message.channel.send(enesemre).then(async msg => {
        setTimeout(() => {
            msg.edit(enesemre.addField('Yeni İsmi', `${kullanici}`).setFooter('İsim Değiştirildi!'))
            message.guild.members.cache.get(kullanici.id).setNickname(`${isim}`)
        }, 3000)
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimdegistir','isim'],
    permLevel: 0
}

exports.help = {
    name: 'isimdeğiştir',
    description: 'Belirttiğiniz kullanıcının kullanıcı adını değiştirir.',
    usage: 'isimdeğiştir @kullanıcı '
}