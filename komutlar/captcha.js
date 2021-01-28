const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setTitle("Captcha Ayarlama Başarısız!").setDescription("Bu Komutu Kullanabilmek için `Yönetici` Yetkisine İhtiyacın Var!").setColor("RED").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})))

    if(db.fetch(`captcha.${message.guild.id}`) && db.fetch(`captcharol.${message.guild.id}`)) {
        await message.channel.send(new Discord.MessageEmbed().setTitle("Captcha Ayarlama Başarısız!").setDescription("Captcha Zaten Ayarlanmış!").setColor("RED").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})))
    }

    let kanal = message.mentions.channels.first();
    if(!kanal) return message.channel.send(new Discord.MessageEmbed().setTitle("Captcha Ayarlama Başarısız!").setDescription("Bir `Kanal` Etiketlemelisin!\nÖrnek: **&captcha #kanal @rol**").setColor("RED").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})));
    let rol = message.mentions.roles.first();
    if(!rol) return message.channel.send(new Discord.MessageEmbed().setTitle("Captcha Ayarlama Başarısız!").setDescription("Bir `Rol` Etiketlemelisin!\nÖrnek: **&captcha #kanal @rol**").setColor("RED").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})));
    db.set(`captcha.${message.guild.id}`, kanal.id);
    db.set(`captcharol.${message.guild.id}`, rol.id);
    await message.channel.send(new Discord.MessageEmbed().setTitle("Captcha Ayarlama Başarılı!").setDescription("Captcha Doğrulama Sistemi Başarıyla Ayarlandı!").setColor("GREEN").setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})))

};

exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ['captcha','dogrulama'],
    permLevel: 0
};
exports.help = {
    name: 'doğrulama'
}