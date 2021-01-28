const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args) => {

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('VoidBot', client.user.displayAvatarURL())
    .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('<:kullanici:789844670301470741> Kullanıcı Komutları', 
    `
<a:beyazok:790320764476719144> **${ayarlar.prefix}afk** \`Afk Moduna Geçersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}avatar** \`Etiketletiğiniz Kişinin veya Kendinizin Avatarını Görüntülersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}cihaz** \`Etiketlediğiniz Kişinin veya Kendinizin Hangi Cihazdan Bağlandığını Görebilirsiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}giriş-sıram** \`Sunucudaki Giriş Sıranızı Görebilirsiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}snipe** \`En Son Silinen Mesajı Görebilirsiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}yetkilerim** \`Sunucudaki Yetkilerinizi Görürsünüz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}öneri** \`Bot Komutlarına Öneride Bulunursunuz.\`
     `)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed).catch(error => {
        if(error.code === Discord.Constants.APIErrors.MISSING_PERMISSIONS) return message.channel.send("Sunucuda yetkim olmadığı için bu komutu gösteremiyorum!")
    })}
}
exports.conf = {
    aliases: ['yardim kullanici','yardım kullanıcı']
}
exports.help = {
    name: "kullanıcı"
}