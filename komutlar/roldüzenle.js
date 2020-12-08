const Discord = require('discord.js');

exports.run = (client, message, args) => {// Dawn#0002 💖


if(message.channel.type == "dm")
//if(!message.member.roles.has('rolid')) return; //belli bir rolün kullanmasını isterseniz alttaki satırı silip bu satırdaki rolid kısmını doldurun ve baltaki slashları silin
if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Bu komudu kullanmak için `rolleri yönet` yetkisine sahip olmalısın')
    let guild = message.guild
    
    let rol = message.mentions.roles.first() || guild.roles.cache.get(args[0]);
    if (!rol) return message.reply('**Rolü belirtmedin**');
    let durum = args[1]
    if(!durum) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`**Doğru Kullanım:** \`!rol-düzenle <@rol/rol id>   \` `))
    const embed = new Discord.MessageEmbed()
    .setTitle('Rol Güncellendi')
    .setColor('GREEN')
    .setTimestamp()
    
    if(durum === "isim"){
    let isim = args[2]
    if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${rol} rolünün adını ne olarak değiştirmek istersin?`))
    rol.edit({
        name: isim
    }).then(role => message.channel.send(embed.setDescription(`${role} rolünün adı başarıyla güncellendi!`)))
    .catch(console.error)
    
   return
    }

if(durum === "renk"){
    let renk = args[2]
    if(!renk) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${rol} rolünün rengini ne olarak değiştirmek istersin? (renk kodu)`))
    rol.edit({
        color: renk
    }).then(role => message.channel.send(embed.setDescription(`${role} rolünün rengi başarıyla güncellendi!`)))
    .catch(console.error)
    
   return
}

    if(durum === "yetki"){
    let yetki = args[2]
    if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`${rol} rolünün adını ne olarak değiştirmek istersin?`))
    rol.edit({
        name: yetki
    }).then(role => message.channel.send(embed.setDescription(`${role} rolünün adı başarıyla güncellendi!`)))
    .catch(console.error)
    
   return
    }
 
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rol-edit', 'rol-düzenle', 'roledit', 'roldüzenle'],
    permLevel: 0
};

exports.help = {
    name: 'roldüzenle',
    description: 'İstediğiniz Rolü düzenler',
    usage: 'roldüzenle [@rol] [isim/renk] [] '
};