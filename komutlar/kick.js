const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "<a:hayirgif:787990150331760641> Bu Komut Yetkililere Özeldir Sen Yetkili Olmadığın İçin Kullanamazsın."
    );
  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "<a:hayirgif:787990150331760641> Yetkilerim çok az bu işlemi yapamamaktayım maalesef."
    );

  const member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!args[0])
    return message.channel.send("<a:hayirgif:787990150331760641> Kimi Kickleyeceğimi Yazmadın.");

  if (!member)
    return message.channel.send(
      "<a:hayirgif:787990150331760641> Kicklemek İstediğin Kullanıcı Bulunamıyor."
    );
  if (!member.kickable)
    return message.channel.send(
      "<a:hayirgif:787990150331760641> Bu Kullanıcı Kicklenemez. Mod & Yönetici Oldukları İçin Yada Rolleri Benimkinden Daha Yüksek Olduğundan Kickleyememekteyim."
    );

  if (member.id === message.author.id)
    return message.channel.send("<a:hayirgif:787990150331760641> Kendini Kickleyemezsin :D?");

  let reason = args.slice(1).join(" ");

  if (reason === undefined) reason = "belirtilmemiş";

  member.kick(reason).catch(err => {
    if (err) return message.channel.send("Bazı Şeyler Ters Gitti.");
  });

  const kickembed = new Discord.MessageEmbed()
    .setTitle("Bir kullanıcı atıldı!")
    .setThumbnail(member.user.displayAvatarURL())
    .addField("Atılan Kişi", member)
    .addField("Komutu Uygulayan Kişi", message.author)
    .addField("Sebebi", reason)
    .setFooter("Atıllan Kişi", client.user.displayAvatarURL())
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
