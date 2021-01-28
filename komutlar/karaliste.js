const Discord = require('discord.js');
const moment = require('moment');
const database = require('quick.db');
moment.locale('tr');

exports.run = async (client, message, chimp) => {// can ♡ b#1010
if(message.author.id !== '702905315674554389') return;

if(!chimp[0]) return message.reply("<a:hayirgif:787990150331760641> Bir kullanıcı id'si girmelisin.");

const user = await client.users.fetch(chimp[0]).catch(err => {
return message.reply('<a:hayirgif:787990150331760641> Bu idye sahip bir kullanıcı bulamadım.')});

if(user) {

  if(database.fetch(user.id)) {
  database.delete(user.id);
  return message.channel.send(`\`${user.tag}\` isimli kullanıcı zaten karalistedeydi, karalisteden çıkarıldı.\nArtık botun komutlarını kullanabilecek.`);
  }
  database.set(user.id, true);
  return message.channel.send(`\`${user.tag}\` isimli kullanıcı başarıyla karalisteye alındı.\n\`${user.username}\`'nin taç sahibi olduğu tüm sunucularda benim komutlarımı kimse kullanamayacak.\nTaç sahibi değil ise, \`${user.username}\` yine komutları kullanamayacak.`);

};

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'karaliste'
};// codare ♥