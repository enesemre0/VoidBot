const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(new Discord.MessageEmbed().setTitle("Hata!").setDescription(`Bu komutu kullanabilmek için \`Üyeleri Yasakla\` iznine ihtiyacın var!`).setColor("RED").setTimestamp().setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})))
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let uye = message.mentions.users.first() || client.users.cache.get(args[0])
  if (!uye) return message.reply(new Discord.MessageEmbed().setTitle("Hata!").setDescription('<a:hayirgif:787990150331760641> Kimi banlayacağını yazmalısın.').setColor("RED").setTimestamp().setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))).catch(console.error);
  if(!uye.bannable) return message.channel.send(new Discord.MessageEmbed().setTitle("Hata!").setDescription("Banlamaya Çalıştığınız Kişi Yetkili/Mod veya Benim Rolümden Üstün Olduğu için Banlayamamaktayım!").setColor("RED").setTimestamp().setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})))
  if(reason === undefined) reason = "Sebep Belirtilmemiş."
  await guild.members.ban(uye, {reason: reason})
  return uye.ban(reason).catch(err => {
    message.channel .send("Bazı Şeyler Ters Gitti.")
  })

  const embed = new Discord.MessageEmbed()
      .setTitle("Yasaklama İşlemi Başarılı!")
      .setColor("RANDOM")
      .setTimestamp()
      .addField('Yasaklanan Kişi:', `${uye.tag} (${uye.id})`)
      .addField('Yetkili:', `${message.author.tag} (${message.author.id})`)
      .addField('Sebep:', reason);
  await message.channel.send(embed)

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
};
exports.help = { 
	name: 'ban', 
	description: 'Belirttiğiniz kişiyi sunucudan banlarsınız.', 
	usage: 'ban' 
}