const Discord = require("discord.js");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
  function sayac(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var saniye = Math.floor( (t/1000) % 60 );
    var dakika = Math.floor( (t/1000/60) % 60 );
    var saat = Math.floor( (t/(1000*60*60)) % 24 );
    var gun = Math.floor( t/(1000*60*60*24) );
    return {'toplam': t,'gun': gun, 'saat': saat, 'dakika': dakika, 'saniye': saniye };
  };

  var gn = new Date();
  var son = 'January 1 ' + (gn.getFullYear() + 1) + " 00:00:00";
  if (gn.getMonth() == 0 && gn.getDate() == 1) {
    son = 'January 1 ' + (gn.getFullYear()) + " 00:00:00";
  };
  var t = sayac(son);
  message.channel.send(`:christmas_tree: Yılbaşının Kutlanmasına **${t.gun} Gün**, **${t.saat} Saat**, **${t.dakika} Dakika**, **${t.saniye} Saniye Kaldı!** :christmas_tree:`)
  if(t.total<=0){
    message.channel.send(`Mutlu Yıllar!`)
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["newyear"],
  permLevel: 0,
};
exports.help = {
  name: "yılbaşı",
  description: "Yılbaşının kutlanmasına kaç gün kaç saat kaç dakika kaç saniye olduğunu gösterir.",
  usage: ""
};