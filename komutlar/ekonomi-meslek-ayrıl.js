const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
    let meslek = await db.fetch(`meslek.${message.author.id}`)

    if(!meslek) {
        message.channel.send("Hiçbir Meslekte Değilsin.")
    } else if (meslek) {
        message.channel.send(meslek + " Mesleğinden Başarıyla Ayrıldın.")
        db.delete(`meslek.${message.author.id}`)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['meslek-ayrıl'],
    permLevel: 0
}
exports.help = {
    name: 'meslekayrıl',
    description: '',
    usage: ''
}