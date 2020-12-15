const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**İŞTE BU!** <:evetgif:787990148225957909>', '**SÜPER!** <:evetgif:787990148225957909>', '**NASIL YAPTIN BUNU?!** <:evetgif:787990148225957909>', '**MÜKEMMEL!** <:evetgif:787990148225957909>', '**SEVDİM BUNU!** <:evetgif:787990148225957909>', '**ŞİMDİ OLDU!** <:evetgif:787990148225957909>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <:hayirgif:787990150331760641>', '**OLMADI BU!** <:hayirgif:787990150331760641>', '**HAY AKSİ!** <:hayirgif:787990150331760641>', '**HADİ ORADAN!** <:hayirgif:787990150331760641>', '**OLMADI YA!** <:hayirgif:787990150331760641>', '**BÖYLE OLMAZ?!** <:hayirgif:787990150331760641>', '**HADİ YA!** <:hayirgif:787990150331760641>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}jail-rol ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, &jail-rol ayarla/sıfırla @rol yazmalısın.\nDetaylı bilgi için: &yardım sustur-kanal`)
   
  
  if (args[0] == 'ayarla') {
  
  let rol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!rol) return message.channel.send(x2 + ` Bir rol etiketle.`)
  
  db.set(`jailrol_${message.guild.id}`, rol.id)
  message.channel.send(x + ` Jail rolü ${rol} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailrol_${message.guild.id}`)
    message.channel.send(x + ` Jail rolü başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailrol'],
 permLevel: 0
};

exports.help = {
 name: 'jail-rol',
 description: 'Birisi jaile atılınca hangi role sahip olacağını ayarlarsınız.',
 usage: 'jail-rol ayarla/sıfırla @rol',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};