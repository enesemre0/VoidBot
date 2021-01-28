const Discord = require("discord.js");
const moment = require('moment');
const db = require("quick.db");
moment.locale('tr');

exports.run = async (client, message, args) => {
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;
  const sebep = args[0];
  if (!args[0]) {
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;

    await db.set(
      `afkSebep_${message.author.id}_${message.guild.id}`,
      "Sebep Girilmemiş"
    );
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);

    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );
    const enesemres = new Discord.MessageEmbed()
      .setTitle("AFK")
      .setDescription("Başarıyla Afk Oldunuz.\nAfk Olma Sebebi: " + a)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(message.author.username + "#" + message.author.discriminator + " Afk Oldu.")

    message.channel.send(enesemres);

    message.member.setNickname(`[AFK] ` + b);
  }
  if (args[0]) {
    let sebep = args.join(" ");
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);
    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );
    const enesemre = new Discord.MessageEmbed()
      .setTitle("AFK")
      .setDescription("Başarıyla Afk Oldunuz.\nAfk Olma Sebebi: " + a)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(message.author.username + "#" + message.author.discriminator + " Afk Oldu.")
    await message.channel.send(enesemre);

    await message.member.setNickname(`[AFK] ` + b);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk "
};