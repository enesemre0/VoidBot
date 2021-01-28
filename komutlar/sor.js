const Discord = require("discord.js");
const moment = require('moment');
const get = require("request")
moment.locale('tr');

exports.run = async (client, message, args) => {
  let soru = args.join(' ');
  if (!soru) return message.reply('soru sormalısın')
  let encodedsoru = encodeURI(soru)
  get(`https://api.codare.fun/sor/${encodedsoru}`, async function (err, resp, body) {
    body = JSON.parse(body);
    if (err) return message.channel.send('hata oluştu')
    message.reply(body.cevap)
  })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sor"],
  permLevel: 0
};

exports.help = {
  name: "sor",
  description: "bota soru sorarsınız",
  usage: "sor"
};