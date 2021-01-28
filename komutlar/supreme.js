const Discord = require("discord.js");
const fetch = require('node-fetch')
const client = require('alexflipnote.js');
const alexclient = new client('tfohPSRsK13M-NK2TcqRNShUgNAT4UTvxSnfOmBq');

exports.run = async (client, message, args) => {
    let yazi = args[0].slice(" ")
    let link = await alexclient.image.supreme({text: yazi})
    //await message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot").setImage({files: [{ attachment: link }]}))
    let enes = ({files: [{ attachment: link }]});

    const embed = new Discord.MessageEmbed()
        .setTitle('VoidBot - Supreme')
        .attachFiles({ attachment: link, name: 'enesemre2977.png' })
        .setImage("attachment://enesemre2977.png")
    await message.channel.send({embed: embed})
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["supreme-yazı","supreme-yazi"],
    permLevel: 0
};

exports.help = {
    name: "supreme",
    description: "",
    usage: ""
};