const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(!args[0]) {
        await message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot - Muffin").setImage("https://media1.tenor.com/images/b9f97ce5758aaa984db7b1cdae049f55/tenor.gif").setFooter(message.author.tag + " Muffin İstedi", message.author.displayAvatarURL({dynamic: true})))
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['muffin'],
    permLevel: 0
}
exports.help = {
    name: 'muffin',
    description: '',
    usage: ''
}