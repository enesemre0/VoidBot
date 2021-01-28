const Discord = require("discord.js");

exports.run = (client, message, args) => {
  const mesaj = args.join(" ");
  let tagdakiler = 0;
  let tag = mesaj;
  if (!mesaj) return message.reply("Bir Tag Girmelisin.");
  message.guild.members.cache.forEach(member => {
    if (member.user.username.includes(tag)) {
      tagdakiler = tagdakiler + 1;
    }
  });
  let emojiler = {
    0: "<a:sifir:787990154278338571>",
    1: "<a:bir:803930088071626812>",
    2: "<a:iki:787990153565962260>",
    3: "<a:uc:803930130913165353>",
    4: "<a:dort:787990153418637342>",
    5: "<a:bes:787990150335692850>",
    6: "<a:alti:787990147080912956>",
    7: "<a:yedi:803930220540723232>",
    8: "<a:sekiz:787990154349510666>",
    9: "<a:dokuz:787990153720758272>"
  }
  message.channel.send(` <a:sagok2:803933680254058516> **\`${mesaj}\` Tagında ${emojiler[tagdakiler]} Kişi Var.**`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tagdakilerisay", "tagsay"]
};

exports.help = {
  name: "tag-say",
  description: "Tagdaki Kullanıcıları Sayar!",
  usage: "BY Team Kod Paylaşım"
};
