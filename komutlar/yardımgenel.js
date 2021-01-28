const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
    if (!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('VoidBot', client.user.displayAvatarURL({dynamic: true}))
            .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
            .addField('<:gazete:790541205863792640> Genel Komutlar', `
<a:beyazok:790320764476719144> **${ayarlar.prefix}rolbilgi** \`Etiketlediğiniz veya İsmini Yazdığınız Rol Hakkında Bilgi Alırsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}istatistik** \`Bot İstatistiklerini Görürsünüz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}korona** \`Korona Günlük/Toplam Veriler Hakkında Bilgi Alırsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}tagsay** \`Girdiğiniz Tag'da Kaç Kişi Olduğunu Sayar.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}bitcoin** \`Bitcoin'in Para Birimlerindeki Değerini Gösterir.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}emojibilgi** \`İsmini Yazdığınız Emoji'nin Bilgilerine Ulaşırsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}emojibul** \`İsmini Yazdığınız Emoji'yi Bot'un Sunucularında Bulur.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}emojikopyala** \`İsmini Yazdığınız Emoji'yi Sunucunuza Kopyalar. (Bot'un Sunucularından Emojiler)\`
            
            
            **İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        await message.channel.send(embed)
        const embed2 = new Discord.MessageEmbed()
            .setAuthor('VoidBot', client.user.displayAvatarURL({dynamic: true}))
            .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
            .addField('<:gazete:790541205863792640> Genel Komutlar', `
<a:beyazok:790320764476719144> **${ayarlar.prefix}renkara** \`Yazdığınız Renk Kodunu Gösterir. (Örnek: #ffffff)\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}resim** \`Attığınız Resmi Yazıya Çevirir.\`
            
            
            **İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
`)
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("RANDOM")
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        await message.channel.send(embed2)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yardım genel", "yardim genel"],
    permLevel: 0
}
exports.help = {
    name: "genel",
    description: "genel yardım menüsünü gösterir",
    usage: ""
}