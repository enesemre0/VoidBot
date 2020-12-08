const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const rexusyardım = new Discord.RichEmbed()
  .setTitle("RexusLeyn Yardım Sistemi")
  .setColor("RANDOM")
  .addField("**-genel**", "** `Genel Komutları Gösterir.`**",)
  .addField("**-yetkili**", "** `Yetkili Komutlarını Gösterir.`**",)
  .addField("**-koruma**", "** `Koruma Komutlarını Gösterir.`**",)
  .addField("**-eğlence**", "** `Eğlence Komutlarını Gösterir.`**",)


  
  
  .setFooter('RexusLeyn ©️ 2020 Tüm Hakları Saklıdır.')

  if (!params[0]) {
    const rexuscommand = Array.from(client.commands.keys());
    const longest = rexuscommand.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(rexusyardım);
  } else {
    let rexuscommands = params[0];
    if (client.commands.has(rexuscommands)) {
      rexuscommands = client.commands.get(rexuscommands);
      message.author.send('RexusLeyn', `= ${rexuscommands.help.name} = \n${rexuscommands.help.description}\nDoğru kullanım: ` + prefix + `${rexuscommands.help.usage}`);
    }
  }
};

exports.conf = {                             
  enabled: true,                             
  guildOnly: false,
  aliases: ['help',],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};