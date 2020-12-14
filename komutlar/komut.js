const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

let codare = "https://discord.gg/t9mza3svC5"

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Yardım', client.user.avatarURL())
    .setDescription('**Örnek Kullanım:** `' + ayarlar.prefix + 'yardım Kategori`\n**Örnek:** `' + ayarlar.prefix + 'yardım genel`\n[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('Komutlar:', 
    `[${ayarlar.prefix}yardım genel(${codare})
    [${ayarlar.prefix}yardım eğlence](${codare})
    [${ayarlar.prefix}yardım kullanıcı](${codare})
    [${ayarlar.prefix}yardım moderasyon](${codare})`)
    .setThumbnail(client.user.avatarURL())
    .setColor("RANDOM")
    .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
    message.channel.send(embed)
}
if(args[0] === 'genel' | args[0] === 'eğlence' | args[0] === 'kullanıcı' | args[0] === 'moderasyon') {
const embed = new Discord.MessageEmbed()
.setAuthor(args[0], client.user.avatarURL())
.setDescription(client.commands.filter(c=>c.conf.kategori === args[0]).map(kmt=>kmt.help.name).join('\:white_small_square: - &\n ') + '» Linkler\n[Davet Et](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8) | [Destek Sunucusu](' + codare + ')y Ver](https://discord.com) | [Web Sitesi](https://discord.com)')
.setThumbnail(client.user.avatarURL())
.setColor("BLUE")
.setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
message.channel.send(embed)
} else {
message.channel.send('Böyle bir kategori yok')
}
  message.channel.send(message.guild.createInvite())
}

exports.conf = {
    aliases: []
}
exports.help = {
    name: "yardım"
}