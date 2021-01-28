const Discord = require("discord.js");

exports.run = (client, message, args) => {

    let enesemre = args.slice(0).join("+");
    if (!enesemre) return message.channel.send("Önce Birşey Yazmalısın!");
    let link = "https://dynamic.brandcrowd.com/asset/logo/055241ff-dc4f-4743-90be-1c9caa0c900b/logo?v=4&text=" + enesemre;

    const enessemre = new Discord.MessageEmbed()

        .setImage(link);

    return message.channel.send(enessemre);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ejderhayazı'],
    permLevel: 0
};

exports.help = {
    name: "ejderha-yazı",
    description: "Ejderha Logosu Yaparsınız",
    usage: "ejderha <yazı>"
};
