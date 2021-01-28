const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {

    let otorolkanal = await db.fetch(`otorolkanal_${message.guild.id}`)
    let anan = args[0]
    let yenimesaj = args.slice(1).join(' ')
    const yetkiembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("Bu Komutu Kullanabilmek için **Rolleri Yönet** İznine İhtiyacın Var!")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(yetkiembed)

    const mesajembed = new Discord.MessageEmbed()
        .setTitle("VoidBot OtoRol - Hata!")
        .setDescription("Yeni Mesaj Girmelisin! Örnek: &otorolmesaj ayarla yenimesaj embed/normal\n&otorolmesaj sıfırla\n`Kullanılabilir Özellikler:` **%üye% - %sunucuismi% - %üyesayısı% - %rol%**\n\n**Destek Almak İçin Destek Sunucumuza [Katılabilirsin!](https://discord.gg/KUyeG5pYQN)**")
        .setColor("RED")
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

    if(anan === "sıfırla") {
        const basarilis = new Discord.MessageEmbed()
            .setTitle("VoidBot OtoRol - Başarılı!")
            .setDescription(`OtoRol Mesajı Başarı İle Sıfırlandı. Artık Sunucuya Yeni Bir Kişi Katıldığında <#${otorolkanal}> Kanalına \n${message.member} Adlı Kullanıcı Sunucuya **Katıldı!** Onunla Birlikte **${message.guild.memberCount}** Kişi Olduk!\n Mesajını Atacağım!`)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

        db.set(`otorolmesaj_${message.guild.id}`, `%üye% Adlı Kullanıcı Sunucuya **Katıldı!** Onunla Birlikte **%üyesayısı%** Kişi Olduk!`)
        await message.channel.send(basarilis)
    } else if (anan === "ayarla"){
        if(!yenimesaj) return message.channel.send(mesajembed).then(a => a.delete({timeout: 20000}))
            const basarili = new Discord.MessageEmbed()
                .setTitle("VoidBot OtoRol - Başarılı!")
                .setDescription(`Artık Sunucuya Katılan Yeni Bir Kişi Katıldığında <#${otorolkanal}> Kanalına \n${yenimesaj}\n Mesajını Atacağım!`)
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            await message.channel.send(basarili)
            db.set(`otorolmesaj_${message.guild.id}`, yenimesaj)
        } else return message.channel.send("Hata! Lütfen Geçerli Bir Değer Giriniz.\nÖrnek: **&otorolmesaj ayarla yenimesaj\n&otorolmesaj sıfırla\n`Kullanılabilir Özellikler:` %üye% - %sunucuismi% - %üyesayısı%**")
    if(!anan) return message.channel.send(mesajembed).then(a => a.delete({timeout: 20000}))

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [''],
    permLevel: '0'
};

exports.help = {
    name: 'otorolmesaj',
    description: 'otorol ysd',
    usage: 'otorol yenimesaj'
};