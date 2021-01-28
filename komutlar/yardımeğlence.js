const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
moment.locale('tr');


exports.run = async(client, message) => {



    const embed = new Discord.MessageEmbed()
    .setAuthor('VoidBot', client.user.displayAvatarURL({dynamic: true}))
    .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
    .addField('<:oyun:790541205825126401> Eğlence Komutları', `
<a:beyazok:790320764476719144> **${ayarlar.prefix}ağla** \`Botu Ağlatırsınız :(\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}fbi** \`Fbi basar.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}kuş-dili-çevirici** \`Yazıyı Kuş Diline Çevirir.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}düello** \`Etiketlediğiniz Kişiyle Düello Atarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}sor** \`Bot'a Soru Sorarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}dürüm** \`Dürüm Yersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}kaçcm** \`Kaç CM Olduğunu Ölçersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}aşk** \`Etiketlediğiniz Kişiyle Aşk Derecenizi Ölçersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}muffin** \`Muffin İstersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}miyav** \`Kedi Fotoğrafları Gösterir.\`
     
     
     **İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
`)
    .setThumbnail(client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    await message.channel.send(embed)

    const embed2 = new Discord.MessageEmbed()
        .setAuthor('VoidBot', client.user.displayAvatarURL({dynamic: true}))
        .setDescription('[VoidBot\'u Hemen Ekle](https://discord.com/oauth2/authorize?client_id=723523223047766046&scope=bot&permissions=8)')
        .addField('<:oyun:790541205825126401> Eğlence Komutları 2', `
<a:beyazok:790320764476719144> **${ayarlar.prefix}ejderhayazı** \`Ejderha Yazısı Yazarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}balıktut** \`Balık Tutarsınız\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}yılbaşı** \`Yılbaşı na Kalan Zamanı Gösterir.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}şut-çek** \`Şut Çekersiniz.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}slot** \`Slot Oynarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}okşa** \`Etiketlediğiniz Kullanıcıyı Okşarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}kalp** \`Etiketlediğiniz Kullanıcıya Kalp Atarsınız.\`
<a:beyazok:790320764476719144> **${ayarlar.prefix}supreme** \`Yazdığınız Yazıyı Supreme Yazıya Dönüştürür.\`
     
     
     **İstek Komutunuz Var ise \`&öneri\` Komutumuzu Kullanabilirsiniz!**
`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RANDOM")
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    await message.channel.send(embed2)
};
exports.conf = {
    aliases: ["yardim eglence","eglence","yardım eğlence"]
}
exports.help = {
    name: "eğlence"
}