const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');

exports.run = async (client, message, args) => {

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first()
} else {
member = message.member;

}

let baknedicm = {
  web: 'İnternet Tarayıcısı',
  desktop: 'Bilgisayar (Uygulama)',
  mobile: 'Mobil'
}

let durum = (member.user.presence.status).replace('dnd', 'Rahatsız etmeyin.').replace('idle', 'Boşta.').replace('online', 'Aktif.').replace('offline', 'Çevrimdışı.');
let kullanıcı;
if(member.user.presence.status !== 'offline') {
kullanıcı = ` **Bağlandığı cihaz**: \`${baknedicm[Object.keys(member.user.presence.clientStatus)[0]]}\`` } else { kullanıcı = '' }
message.channel.send(`\`${member.user.tag}\` kullanıcısının durumu: **${durum}**${kullanıcı}`)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'cihaz'
};