const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  let kişi = message.mentions.users.first();
  if (await data.fetch(`slm.${message.author.id}.${message.guild.id}.aşk`)) return message.channel.send(new Discord.MessageEmbed().setColor('#00001').setDescription(`**20 saniyenin altında hızlı kullanamazsın!**`));
  if (!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#000000').setDescription(`Sevdiğin kişiyi etiketlemelisin.`)).then(a => a.delete({ timeout: 10000 }))
  var sevgiler = ['0','7','11','15','19','24','31','36','46','53','61','73','79','86','91','95','100','101','999','500'];
  let sevgi = sevgiler[Math.floor(Math.random() * sevgiler.length)];
  if (kişi == message.author.id) {
    return message.reply("Ne kadar yıkıksın :(")
  } else {
    await message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.username} \`&\` ${message.mentions.members.first().user.username}`).setThumbnail('https://media1.tenor.com/images/82e2feacd70235f610c2cb7548e0a9cd/tenor.gif')
    .setDescription(`**${kişi} ile aranda \`%${sevgi}\` sevgi var.** 🥰`));
  message.delete({ timeout: 10000 });
}

  data.set(`slm.${message.author.id}.${message.guild.id}.aşk`, 'codare');
  setTimeout(() => {
    data.delete(`slm.${message.author.id}.${message.guild.id}.aşk`)
  }, 20000);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'aşk'
};