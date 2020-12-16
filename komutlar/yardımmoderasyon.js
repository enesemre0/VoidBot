const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

let prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

let desteksunucusu = "https://discord.gg/UZFxuEfxtQ";

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Moderasyon Komutları', client.user.avatarURL())
    .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('Komutlar:', 
    `[${prefix}rolver](${desteksunucusu})
     [${prefix}rolal](${desteksunucusu})
     [${prefix}jail](${desteksunucusu})
     [${prefix}jailkanal](${desteksunucusu})
     [${prefix}jailrol](${desteksunucusu})
     [${prefix}jailyetkisi](${desteksunucusu})
     [${prefix}ban](${desteksunucusu})
     [${prefix}unban](${desteksunucusu})
     [${prefix}kick](${desteksunucusu})
     [${prefix}votekick](${desteksunucusu})
     [${prefix}temizle](${desteksunucusu})
     [${prefix}mute](${desteksunucusu})
     [${prefix}mutelog](${desteksunucusu})
     [${prefix}sa-as](${desteksunucusu})`)
    .setThumbnail(client.user.avatarURL())
    .setColor("RANDOM")
    .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL());
    message.channel.send(embed);
};}
exports.conf = {
    aliases: ["moderasyon"]
}
exports.help = {
    name: "yardım eğlence"
}