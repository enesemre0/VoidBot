const Discord = require('discord.js');

exports.run = (client, message, args) => {
if(!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send('Bu komutu kullanabilmek için `Emojileri Yönet` yetkisine sahip olmalısın.');
if(!args[0]) return message.channel.send('Bir link ve ad yazmalısın.\n**Örnek Kullanım**: `&emojiekle link emojiadı`');
if(!args[0].endsWith('.png' || '.jpg' || '.webp' || '.gif')) return message.channel.send('Doğru bir link yazmalısın.');
if(!args[1]) return message.channel.send('Bir emoji adı yazmalısın.\n**Örnek Kullanım**: `&emojiekle link emojiadı`');
if(['ç', 'ö', 'ü', 'ş', 'İ', 'I', 'ğ', 'Ç', 'Ö', 'Ü', 'Ş', 'Ğ'].includes(args[1])) return message.channel.send('**Emoji adını yazarken Türkçe karakter kullanmamalısın!**');
message.guild.emojis.create(args[0], args.slice(1).join(' ')).catch(error => {
    if(error.code === Discord.Constants.APIErrors.MISSING_PERMISSIONS) return message.channel.send("Sunucuda yetkim olmadığı için emoji ekleyemiyorum!")
});
message.channel.send(`${args[1]} adında emoji oluşturuldu. (${args[1]})`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emojiekle'],
  permLevel: 0
};
 
exports.help = {
  name: 'emoji-ekle'
};