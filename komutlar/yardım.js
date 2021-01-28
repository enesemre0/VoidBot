const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args) => {

let desteksunucusu = "https://discord.gg/UZFxuEfxtQ"

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('VoidBot', client.user.displayAvatarURL())
    .setDescription('**Örnek Kullanım:** `' + ayarlar.prefix + 'kategori`\n**Örnek:** `' + ayarlar.prefix + 'genel`\n[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)\n[Destek Sunucusuna Hemen Katıl!]('+desteksunucusu+')\n**VoidBot v2.5 Sürümü**')
    .addField('<:menu:790542260545781760> Yardım Menüleri:', 
    `
    <a:beyazok:790320764476719144> **[${ayarlar.prefix}genel](${desteksunucusu})** - \`Genel Komutları Gösterir.\`
    <a:beyazok:790320764476719144> **[${ayarlar.prefix}eğlence](${desteksunucusu})** - \`Eğlence Komutlarını Gösterir.\`
    <a:beyazok:790320764476719144> **[${ayarlar.prefix}kullanıcı](${desteksunucusu})** - \`Kullanıcı Komutlarını Gösterir.\`
    <a:beyazok:790320764476719144> **[${ayarlar.prefix}moderasyon](${desteksunucusu})** - \`Moderasyon Komutlarını Gösterir.\`
    

    <:guncelleme:790321668672454707> **[${ayarlar.prefix}güncelleme](${desteksunucusu})**
    <:guncelleme:790321668672454707> **[${ayarlar.prefix}öneri](${desteksunucusu})**
    <:web:800827293118234674> **[${ayarlar.prefix}website](https://voidbot.enesemre.net/)**
    `)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed).catch(error => {
        if(error.code == Discord.Constants.APIErrors.MISSING_PERMISSIONS) return message.channel.send("Sunucuda yetkim olmadığı için bu komutu gösteremiyorum!")
    })
};}
exports.conf = {
    aliases: ['help','yardim']
}
exports.help = {
    name: "yardım"
}