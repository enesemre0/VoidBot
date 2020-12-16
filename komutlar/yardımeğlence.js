const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

let prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

let desteksunucusu = "https://discord.gg/UZFxuEfxtQ";

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Genel Komutlar', client.user.avatarURL())
    .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('Komutlar:', 
    `${prefix}ağla`)
    .setThumbnail(client.user.avatarURL())
    .setColor("RANDOM")
    .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL());
    message.channel.send(embed);
};}
exports.conf = {
    aliases: ["genel"]
}
exports.help = {
    name: "yardım genel"
}