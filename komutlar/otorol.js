const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    let enesemre = args[0]
    let rol = message.mentions.roles.first()
    let kanal = message.mentions.channels.first()
    let durum = db.fetch(`otoroldurum_${message.guild.id}.otorol.durum`)

    const yetkiembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("Bu Komutu Kullanabilmek için **Rolleri Yönet** İznine İhtiyacın Var!")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(yetkiembed)

    const ayarlaembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Başarılı!")
        .setDescription("OtoRol **Başarıyla Ayarlandı!** Artık Sunucuya Yeni Katılan Kişilere <@&" + rol + "> Rolünü Vereceğim!\n**OtoRol Mesajını Ayarlamak İçin &otorolmesaj `yenimesaj` Yazabilirsiniz!**")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    const sifirlaembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Başarılı!")
        .setDescription("OtoRol **Başarıyla Sıfırlandı!**")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    const enesembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("**Bir işlem girmelisiniz!**\nÖrnek: **&otorol ayarla @Üye #kanal** - **&otorol sıfırla**")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    const hataembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("**Bir Rol Etiketlemelisiniz!**")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    const kanalembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("**Bir Kanal Etiketlemelisiniz!**")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    const ayarlanmamis = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("**Zaten Ayarlanmamış Olan Bir Şeyi Sıfırlayamam!**")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    if(!enesemre){
        await message.channel.send(enesembed)
    } else if (enesemre === "ayarla"){
        if(!rol) return message.channel.send(hataembed)
        if(!kanal) return message.channel.send(kanalembed)

        db.set(`otorol_${message.guild.id}`, rol.id)
        db.set(`otorolkanal_${message.guild.id}`, kanal.id)
        db.set(`otoroldurum_${message.guild.id}.otorol.durum`, 'acik')
        await message.channel.send(ayarlaembed)

    } else if (enesemre === "sıfırla"){
        if(!durum) return message.channel.send(ayarlanmamis)
        db.delete(`otorol_${message.guild.id}`)
        db.delete(`otorolkanal_${message.guild.id}`)
        db.delete(`otoroldurum_${message.guild.id}.otorol.durum`)
        await message.channel.send(sifirlaembed)
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol'],
    permLevel: '0'
};

exports.help = {
    name: 'otorol',
    description: 'otorol ysd',
    usage: 'otorol ayarla @üye '
};