const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message) => {
    let etiket = message.mentions.users.first()

    if(etiket == message.author.id) {
        message.channel.send("Kendine Kalp Atmaya Çalışıyor :( :broken_heart:")
    } else if (!etiket) {
        message.channel.send("Kime Kalp Atacaksın ?")
    } else {

        await message.channel.send(new Discord.MessageEmbed().setTitle("VoidBot - Kalp").setDescription(`${message.author} Adlı Kullanıcı ${etiket}'e Kalp Gönderdi! <:kalpppp:789940114989514753>`).setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setColor("FF0000").setThumbnail("https://cdn.discordapp.com/attachments/784049658304790589/797041362918309968/tenor_1.gif"))
        await etiket.send(`**${message.author.tag}** Adlı Kişi Size **${message.guild.name}** Adlı Sunucuda Kalp Gönderdi!\n**Mesaj Detayı**: <#${message.channel.id}> Kanalında`).catch(err => message.channel.send("Etiketlediğin Kişinin Özel Mesajları Kapalı Olduğundan Mesaj Gönderemiyorum.").then(a => a.delete({timeout: 5000})))
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kalpgönder','kalpgonder','kalpat'],
    permLevel: 0
}

exports.help = {
    name: 'kalp',
    description: 'Etiketlediğiniz Oyuncuya Kalp Atarsınız',
    usage: '&kalp @EnesEmre#2977'
}