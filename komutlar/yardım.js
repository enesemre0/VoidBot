const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

let desteksunucusu = "https://discord.gg/UZFxuEfxtQ"

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Yardım', client.user.avatarURL())
    .setDescription('**Örnek Kullanım:** `' + ayarlar.prefix + 'yardım Kategori`\n**Örnek:** `' + ayarlar.prefix + 'yardım genel`\n[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('Yardım Menüleri:', 
    `[${ayarlar.prefix}genel](${desteksunucusu})
    [${ayarlar.prefix}eğlence](${desteksunucusu})
    [${ayarlar.prefix}kullanıcı](${desteksunucusu})
    [${ayarlar.prefix}moderasyon](${desteksunucusu})`)
    .setThumbnail(client.user.avatarURL())
    .setColor("RANDOM")
    .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
    message.channel.send(embed)
};}
exports.conf = {
    aliases: []
}
exports.help = {
    name: "yardım"
}