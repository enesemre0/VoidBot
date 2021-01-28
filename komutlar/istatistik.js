const Discord = require("discord.js");
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

exports.run = async (client, message) => {
  const zaman = moment
    .duration(client.uptime)
    .format(" d [gün], h [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.MessageEmbed()
      .setTitle("İstatistik")
      .setColor("RANDOM")
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
      .addField("<:owner:789842152942731265> **Botun Sahibi**", "<@702905315674554389> EnesEmre#2977 - EnesEmre#2978")
      .addField("<:ayar:789844468126973952> **Gecikme süreleri**","Bot Gecikmesi: {ping2} ms"
          .replace("{ping2}", client.ws.ping),true)
      .addField("<:bilgilendirme:789847649183989762> **Ram kullanımı**",(process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",true)
      .addField("<:sure:789848035559342141> **Çalışma süresi**", zaman, true)
      .addField("<:kullanici:789844670301470741> **Kullanıcılar**",client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
      .addField("<a:sunucu:789845375766102046> **Sunucular**", client.guilds.cache.size.toLocaleString(), true)
      .addField("<:hashtag:787990131758989313> **Kanallar**", client.channels.cache.size.toLocaleString(), true)
      .addField("<:menu:790542260545781760> **Komut Sayısı**", client.commands.size, true)
      .addField("<:javascript:789841859782246410> **Discord.JS sürüm**", "v" + Discord.version, true)
      .addField("<:javascript:789841859782246410> **Node.JS sürüm**", `${process.version}`, true)
      .addField("<:cpu:789845637641273384> **CPU**",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``,true)
      .addField("<:bit:789845855849938955> **Bit**", `\`${os.arch()}\``, true)
      .addField("<:isletim:789846009390956575> **İşletim Sistemi**", `\`${os.platform()}\``, true)
      .addField("<:bot:789846268045819925> **Bot Davet**"," [Davet Et!](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)", true)
      .addField("<:destek:791602133832433704> **Destek Sunucusu**","[Hemen Katıl!](https://discord.gg/UZFxuEfxtQ)", true)
      .addField("<:web:800827293118234674> **Website**","[Bana Tıkla!](https://voidbot.enesemre.net/)")
  return message.channel.send(istatistikler);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir",
  usage: "istatistik"
};