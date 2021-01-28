const Discord = require('discord.js')
const db = require('quick.db');
const moment = require('moment');

exports.run = async (client, message, args) => {
  moment.locale('tr');

 if (!message.member.hasPermission("MANAGE_MESSAGES")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('<a:hayirgif:787990150331760641> Bu komutu kullanabilmek için **Mesajları Yönet** yetkisine sahip olmanız gerek.')
  .setColor("0000A0")
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`mlog_${message.guild.id}`)
if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(`<a:hayirgif:787990150331760641> Mute Log Kanalı zaten ayarlı değil.`)
                     
      return
    }
    db.delete(`mlog_${message.guild.id}`)
    message.channel.send(`<a:evetgif:787990148225957909> Mute Log Kanalı başarıyla sıfırlandı.`)
                
    return
  }
  if (!mlog) {
    return message.channel.send(
    `<a:hayirgif:787990150331760641> Mute Log Olacak Kanalı etiketlemelisin.`)                       
  }
  db.set(`mlog_${message.guild.id}`, mlog.id)
  message.channel.send(`<a:evetgif:787990148225957909> Mute Log Kanalı başarıyla ${mlog} olarak ayarlandı.`)
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mute-log'],
    permLevel: 0
}

exports.help = {
    name: 'mute-log-ayarla',
    description: 'Mute Logu Ayarlar.',
    usage: '-mute-log #kanal'
}