const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
moment.locale('tr');


exports.run = async(client, message) => {

    const embed = new Discord.MessageEmbed()
    .setAuthor('VoidBot', client.user.displayAvatarURL())
    .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('<a:moderasyon:790541713822974014> Moderasyon Komutları',
    `
<a:beyazok:790320764476719144> **${ayarlar.prefix}rolver** \`Etiketlediğiniz Kişiye Belirttiğiniz Rolü Verirsiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}rolal** \`Etiketlediğiniz Kişiden Belirttiğiniz Rolü Alırsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}ban** \`Etiketlediğiniz Kişiyi Sunucudan Yasaklarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}unban** \`IDsini Yazdığınız Kişinin Yasağını Açarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}kick** \`Etiketlediğiniz Kişiyi Sunucudan Atarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}votekick** \`Etiketlediğiniz Kişiyi Oylama İle Atarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}temizle** \`Belirttiğiniz Sayı Kadar Mesaj Silersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}mute** \`Etiketlediğiniz Kişiyi Susturursunuz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}mutelog** \`Susturma Kanal Log'u Belirlersiniz.\`
     
     
     **İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
     `)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed).catch(error => {
        if(error.code === Discord.Constants.APIErrors.MISSING_PERMISSIONS) return message.channel.send("Sunucuda yetkim olmadığı için bu komutu gösteremiyorum!")
    })
    const embed2 = new Discord.MessageEmbed()
        .setAuthor('VoidBot', client.user.displayAvatarURL())
        .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
        .addField('<a:moderasyon:790541713822974014> Moderasyon Komutları 2',
            `
<a:beyazok:790320764476719144> **${ayarlar.prefix}sa-as** \`Sa-As Sistemini Açarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}emojiekle** \`Sunucuya Emoji Eklersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}oylama** \`Sunucuda Oylama Yaparsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}nuke** \`Bulunduğunuz Kanalı Siler ve Tekrar Oluşturur.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}otorol ayarla/sıfırla** \`OtoRol Sistemini Ayarlarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}otorolmesaj ayarla/sıfırla** \`OtoRol Sistemindeki Giriş Mesajını Ayarlarsınız.\`
     
**İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
          `)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed2).catch(error => {
        if(error.code == Discord.Constants.APIErrors.MISSING_PERMISSIONS) return message.channel.send("Sunucuda yetkim olmadığı için bu komutu gösteremiyorum!")
    })
};
exports.conf = {
    enabled: true,
    aliases: ["yardım moderasyon","mod"]
}
exports.help = {
    name: "moderasyon"
}