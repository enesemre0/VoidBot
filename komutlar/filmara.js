const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios')
exports.run = (client, message, args) => {

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'filmara',
    description: 'film',
    usage: 'film'
};