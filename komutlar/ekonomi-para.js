const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let uye = message.mentions.users.first() || message.author

    if(uye.bot) return;
    const para = new Discord.MessageEmbed()
        .setTitle("VoidBot Ekonomi - Para")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(uye.displayAvatarURL({dynamic: true}))
        .setColor("RANDOM")
        .addField("<:para:801037869288259624> Para",`${db.fetch(`bakiye.${uye.id}`) || "0"} TL`, true)
        .addField("<:bilet:803606217368535041> Bilet",`${db.fetch(`bilet.${uye.id}`) || "0"}`, true)
        .addField("<:envanter:803610187344379966> Envanter",`<:kazma:803609566981259314> **Kazma**: ${db.fetch(`kazma.${uye.id}`) || "<:yanlis1:788333820209790986>"}\n<:silah:803609787395866665> **Silah**: ${db.fetch(`silah.${uye.id}`) || "<:yanlis1:788333820209790986>"}`)
        .setTimestamp()
    await message.channel.send(para)
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['bakiye','param','cüzdan','cuzdan','envanter','bilet','cash','ticket','inventory'],
    permLevel: 0
}
exports.help = {
    name: 'para',
    description: '',
    usage: ''
}