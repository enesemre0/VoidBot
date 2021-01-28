const Discord = require('discord.js');

exports.run = (client, message) => {
    let enesemre = ['Sazan Tuttun! :fish:', 'Köpek Balığı Tuttun İyi Para Eder Sat Sat :D', 'Uskumru Tuttun! :fish:', 'Mezgit Tuttun! Havyarıda Var hee ;) :fish:', 'Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde?', 'Hamsi Tuttun! :fish:', 'Levrek Tuttun! :fish:', 'Hiçbirşey Tutamadın Maalesef! :wastebasket:', 'Alabalık Tuttun! :fish:', 'Maalesef Balık Oltadan Kaçtı! :wastebasket:', 'İstavrit Tuttun! :fish:'];
    let enes = enesemre[Math.floor(Math.random() * enesemre.length)];

    const eness = new Discord.MessageEmbed()
        .setTitle("VoidBot Balık Tutma")
        .setDescription("Balığı Tuttun Çekiyorsun...")
        .setTimestamp()
        .setThumbnail(message.bot.displayAvatarURL({dynamic: true}))
        .setColor("GOLD")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(eness).then(async msg => {
        setTimeout(() => {
            msg.edit(eness.setDescription(enes))
        }, 3000)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'balıktut',
    description: 'Balık Tutarsın.',
    usage: ''
};