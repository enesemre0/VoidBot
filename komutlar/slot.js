const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const { stripIndents } = require("common-tags");

const slots = ["🍇", "🍊", "🍐", "🍒", "🍋"];

exports.run = function(client, message) {

let enesemre = slots[Math.floor(Math.random() * slots.length)];
let enesemre2 = slots[Math.floor(Math.random() * slots.length)];
let enesemre3 = slots[Math.floor(Math.random() * slots.length)];

  if (enesemre === enesemre2 && enesemre === enesemre3) { return message.channel.send(stripIndents`**Tebrikler, kazandınız!** \n\n${enesemre} **:** ${enesemre2} **:** ${enesemre3}`);

  } else {
   return message.channel.send(stripIndents`**Eyvah, kaybettin!** \n\n${enesemre} **:** ${enesemre2} **:** ${enesemre3}`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "slot",
  description: "Slots oyunu oynatır",
  usage: "slots"
};