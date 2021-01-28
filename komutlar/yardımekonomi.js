const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
moment.locale('tr');


exports.run = async(client, message) => {



    const embed = new Discord.MessageEmbed()
        .setAuthor('VoidBot', client.user.displayAvatarURL({dynamic: true}))
        .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
        .addField('<:oyun:790541205825126401> Eğlence Komutları', `
<a:beyazok:790320764476719144> **${ayarlar.prefix}ağla** \`Botu Ağlatırsınız :(\`

     
     
     **İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    await message.channel.send(embed)
};
exports.conf = {
    aliases: ["yardim ekonomi","ekonomı"]
}
exports.help = {
    name: "ekonomi"
}