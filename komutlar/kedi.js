const Discord = require('discord.js');
const axios = require('axios');

exports.run = async (client, message, args) => {
    axios.get('https://api.thecatapi.com/v1/images/search').then((res) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("VoidBot - Miyav")
            .setDescription("İşte Kedi :)")
            .setImage(res.data[0].url)
        message.channel.send(embed)
    })

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['miyav'],
    permLevel: 0
}
exports.help = {
    name: 'kedi',
    description: '',
    usage: ''
}