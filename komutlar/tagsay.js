const Discord = require("discord.js");

const ayarlar = require("../ayarlar.json");

exports.run = (client, message, args) => {
/*  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply(
      `Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`
    );*/

  const tag = args.slice(0).join(" ");

  if (!tag)
    return message.reply(
      `<a:hayirgif:787990150331760641> Bir Tag Girmelisiniz Örnek Kullanım; \n \`${ayarlar.prefix}tagsay tag\``
    );

  const memberss = message.guild.members.cache.filter(member =>
    member.user.username.includes(tag)
  );

  const embed = new Discord.MessageEmbed()

    .addField(
      `Kullanıcı Adında ${tag} Tagı Olan Kullanıcılar`,
      memberss
        .map(member => `${member} = ${member.user.username}`)
        .join("\n") || `Kimsenin kullanıcı Adında \`${tag}\` Tagı Bulunmuyor.`
    )

    .setColor("RANDOM");

  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,

  guildOnly: true,

  aliases: ["tag-say"],

  permLevel: 0
};

exports.help = {
  name: "tagsay",

  description: "Kullanıcıların kullanıcı adını tarar.",

  usage: "tag-taraması <tag>"
};
