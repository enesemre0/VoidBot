const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "Bu Komut Yetkililere Özeldir Sen Yetkili Olmadığın İçin Kullanamazsın."
    );
  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "Yetkilerim çok az bu işlemi yapamamaktayım maalesef"
    );

  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!args[0])
    return message.channel.send("Kullanıcı Belirtmeyi Unuttun Sanki?");

  if (!member)
    return message.channel.send(
      "Kicklemek İstediğin Kullanıcıyı Bulamıyorum Doğru Kişiyi Aradığına Eminmisin?"
    );
  if (!member.kickable)
    return message.channel.send(
      "Bu Kullanıcı Kicklenemez. Mod & Yönetici Oldukları İçin Yada En Yüksek Rolleri Benimkinden Daha Yüksek Oldundan Banlayamamaktayım."
    );

  if (member.id === message.author.id)
    return message.channel.send("Dostum Kendini Yasaklamayamı Çalıştın Sen?.");

  let reason = args.slice(1).join(" ");

  if (reason === undefined) reason = "belirtilmemiş";

  member.kick(reason).catch(err => {
    if (err) return message.channel.send("Bazı Şeyler Ters Gitti Sanırsam?");
  });

  const kickembed = new Discord.MessageEmbed()
    .setTitle("Üye Atıldı")
    .setThumbnail(member.user.displayAvatarURL())
    .addField("Kullanıcı Atıldı", member)
    .addField("Tarafından Atıldı", message.author)
    .addField("Sebebi", reason)
    .setFooter("Kullanıcı Atıldı", client.user.displayAvatarURL())
    .setTimestamp();

  message.channel.send(kickembed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kick"],
  permLevel: 0
};

exports.help = {
  name: "kick",
  description: "kick ",
  usage: "kick"
};
