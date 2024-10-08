const Discord  = module.require('discord.js');
const moment = require('moment');
moment.locale('tr');

const agree    = "<:dogru1:788333822223712257>";
const disagree = "<:yanlis1:788333820209790986>";

module.exports.run = async (bot, message, args) => {

  if (message.mentions.users.cache.size === 0){
    return message.channel.send("<a:hayirgif:787990150331760641> **| Lütfen Birini Etiketleyiniz!**");
  }

  let kickmember = message.guild.member(message.mentions.users.first());
  if(!kickmember){
    message.channel.send("<a:hayirgif:787990150331760641> **| Bu Kullanıcı Geçerli Görmüyor!**");
  }

  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
    return message.channel.send("<a:hayirgif:787990150331760641> **| Bu Komutu Kullanmak İçin** \`Üyeleri At\` **İznine Sahip Olmalısın!** ").catch(console.error);
  }

  let msg = await message.channel.send(":timer: **| Şimdi Oyla (**\`10\`**) Saniyeniz Var!**").then(m => m.react(agree)).then(a => a.react(disagree))

  let reactions = msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000}).then(w => w.delete)


  let NO_Count = reactions.get(disagree).count;
  let YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    let YES_Count = 1;
  }else{
    let YES_Count = reactions.get(agree).count;
  }

  const sumsum = new Discord.MessageEmbed()

      .addField("**Oylama Tamamlandı!**", "-----------------------\n" +
          " **| Toplam Oy (**\`Evet\`**)** ➠ " + `${YES_Count-1}\n` +
          " **| Toplam Oy (**\`Hayır\`**)** ➠ " + `${NO_Count-1}\n` +
          "-----------------------\n" +
          "**NOT: Kick Atmak İçin Gerekli Oylar (**\`+3\`**)**\n" +
          "-----------------------", true)

      .setColor("RANDOM")

  await message.channel.send(sumsum);

  if(YES_Count >= 4 && YES_Count > NO_Count){

    kickmember.kick().then(member => {
      message.reply(`<a:evetgif:787990148225957909> **|** **${member.user.username} **Adlı Kullanıcı Başarıyla Oy Kick Sistemi İle Tekmelendi.`)
    })
  }else{

  }

  message.channel.send("\n" + "<a:sagok:706147013250514966> **| Şimdilik Güvende!**");
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['oy-kick','votekick','vote-kick'],
  permLevel: 0
};

exports.help = {
  name: 'oy-kick',
  description: 'Sunucuda Oy Kick Sistemi İle Birini Sunucudan Atmaya İşe Yarar.',
  usage: 'oy-kick'
};