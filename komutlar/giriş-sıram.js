const Discord = require('discord.js');
const moment = require('moment');
const database = require('quick.db');
moment.locale('tr');

exports.run = async (client, message, args) => {// can ♡ b#1010

    let ad = message.guild.members.cache.array();
    let üj = [];
    let max = (ad.length < message.guild.memberCount) ? ad.length : message.guild.memberCount;
    for (var i = 0; i < max; i++) {
        var member = ad[i];
        üj.push({ member: member, sd: member.user.username, slm: member.joinedAt });
    };
    üj = üj.sort((a, b) => a.slm - b.slm);
    let nn = üj.map(a => a.sd);
    var i = 0;
    let sıra;
    nn.forEach(s => {
        i++
        if (s === message.author.username) sıra = i;
    });

    message.channel.send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${nn[sıra - 2] || 'Bilinmiyor'} <a:sagok:787990131998064640> **${nn[sıra - 1]}** <a:sagok:787990131998064640> ${nn[sıra] || 'Bilinmiyor'}`)
        .setAuthor(client.user.username, client.user.avatarURL({ dynamic: true }))
        .setTitle('Giriş Sıran'));


};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'giriş-sıram'
};// codare ♥