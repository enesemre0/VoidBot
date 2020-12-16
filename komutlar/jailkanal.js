const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**İŞTE BU!** <a:evetgif:787990148225957909>', '**SÜPER!** <a:evetgif:787990148225957909>', '**NASIL YAPTIN BUNU?!** <a:evetgif:787990148225957909>', '**MÜKEMMEL!** <a:evetgif:787990148225957909>', '**SEVDİM BUNU!** <a:evetgif:787990148225957909>', '**ŞİMDİ OLDU!** <a:evetgif:787990148225957909>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <a:hayirgif:787990150331760641>', '**OLMADI BU!** <a:hayirgif:787990150331760641>', '**HAY AKSİ!** <a:hayirgif:787990150331760641>', '**HADİ ORADAN!** <a:hayirgif:787990150331760641>', '**OLMADI YA!** <a:hayirgif:787990150331760641>', '**BÖYLE OLMAZ?!** <a:hayirgif:787990150331760641>', '**HADİ YA!** <a:hayirgif:787990150331760641>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}jail-kanal ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, &jail-kanal ayarla/sıfırla @rol yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let kanal = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args[1].join('-'))
  if (!kanal) return message.channel.send(x2 + ` Bir kanal etiketle.`)
  
  db.set(`jailkanal_${message.guild.id}`, kanal.id)
  message.channel.send(x + ` Jail logunun tutulacağı kanal ${kanal} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailkanal_${message.guild.id}`)
    message.channel.send(x + ` Jail logunun tutulduğu kanal başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailkanal'],
 permLevel: 0
};

exports.help = {
 name: 'jail-kanal',
 description: 'Birisi jaile atılınca hangi kanala mesaj atılacağını ayarlarsınız.',
 usage: 'jail-kanal ayarla/sıfırla #kanal',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};