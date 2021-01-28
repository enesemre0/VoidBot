const Discord = require("discord.js");

exports.run = async (client, message, args, dil, renk, dbl) => {
  let mesaj = args[0];
  if (!args)
    return message.channel.send("Aratmak İstediğin Emoji İsmini Girmelisin.");
  let emoji = client.emojis.cache.find(s => s.name === mesaj);
  if (!emoji) return message.channel.send("Aradığınız Emoji Bulunamadı");
  const embed = new Discord.MessageEmbed()
      .setTitle("VoidBot - EmojiBul")
      .addField("Emoji Adı", emoji.name)
      .addField("Emoji ID", emoji.id)
      .addField("Emoji Link", emoji.url)
      .addField("Emojinin Alındığı Sunucu", emoji.guild.name)
      .setThumbnail(emoji.url)
      .setFooter("Emojiyi Eklemek İçin 👍 Emojisine Basabilirsiniz!")
  message.channel.send(embed).then(msg => {
    msg.react(`👍`)

    const filter = (reaction, user) => {
      return [`👍`].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === '👍') {
            message.guild.emojis.create(emoji.url, emoji.name)
            let enes = message.guild.emojis.cache.find(m => m.name = emoji.name)
            const enesemre = new Discord.MessageEmbed()
                .setTitle("VoidBot - Emoji Eklendi!")
                .addField("Emoji Adı", enes.name)
                .addField("Emoji ID", enes.id)
                .addField("Emoji Link", enes.url)
                .addField("Emojiyi Ekleyen", message.author.tag)
                .setThumbnail(enes.url)
                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(enesemre)
          } else return;
        })
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emoji-bul"],
  permLevel: 0,
  kategori: "Kullanıcı"
};

exports.help = {
  name: "emojibul",
  description: "Botun bulunduğu sunucular arasında yazdığınız emojiyi arar",
  usage: "emojibul <isim>"
};