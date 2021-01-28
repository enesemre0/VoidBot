const Discord = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = (client, msg, args) => {
    let x;
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    let x7;
    let x8;
    let x9;
    let x10;
    let x11;
	
	let kişi = msg.mentions.users.first() || msg.member

    //yönetici
    if (kişi.permissions.has("ADMINISTRATOR"))
        x = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("ADMINISTRATOR"))
        x = `<a:hayirgif:787990150331760641>`;

    //Denetim kaydı
    if (kişi.permissions.has("VIEW_AUDIT_LOG"))
        x2 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("VIEW_AUDIT_LOG"))
        x2 = `<a:hayirgif:787990150331760641>`;

    //Sunucuyu yönet
    if (kişi.permissions.has("MANAGE_GUILD"))
        x3 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_GUILD"))
        x3 = `<a:hayirgif:787990150331760641>`;

    //Rolleri yönet
    if (kişi.permissions.has("MANAGE_ROLES"))
        x4 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_ROLES"))
        x4 = `<a:hayirgif:787990150331760641>`;

    //Kanalları yönet
    if (kişi.permissions.has("MANAGE_CHANNELS"))
        x5 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_CHANNELS"))
        x5 = `<a:hayirgif:787990150331760641>`;

    //üyeleri at
    if (kişi.permissions.has("KICK_MEMBERS"))
        x6 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("KICK_MEMBERS"))
        x6 = `<a:hayirgif:787990150331760641>`;

    //üyeleri yasakla
    if (kişi.permissions.has("BAN_MEMBERS"))
        x7 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("BAN_MEMBERS"))
        x7 = `<a:hayirgif:787990150331760641>`;

    //mesajları yönet
    if (kişi.permissions.has("MANAGE_MESSAGES"))
        x8 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_MESSAGES"))
        x8 = `<a:hayirgif:787990150331760641>`;

    //kullanıcı adlarını yönet
    if (kişi.permissions.has("MANAGE_NICKNAMES"))
        x9 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_NICKNAMES"))
        x9 = `<a:hayirgif:787990150331760641>`;

    //emojileri yönet
    if (kişi.permissions.has("MANAGE_EMOJIS"))
        x10 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_EMOJIS"))
        x10 = `<a:hayirgif:787990150331760641>`;

    //webhookları yönet
    if (kişi.permissions.has("MANAGE_WEBHOOKS"))
        x11 = `<a:evetgif:787990148225957909>`;
    if (!kişi.permissions.has("MANAGE_WEBHOOKS"))
        x11 = `<a:hayirgif:787990150331760641>`;
    //üyeleri sustur
    if(kişi.permissions.has("MUTE_MEMBERS"))
       var x12 = `<a:evetgif:787990148225957909>`;
    if(!kişi.permissions.has("MUTE_MEMBERS"))
       var x12 = `<a:hayirgif:787990150331760641>`;
    //üyeleri sağırlaştır
    if(kişi.permissions.has("DEAFEN_MEMBERS"))
       var x13 = `<a:evetgif:787990148225957909>`;
    if(!kişi.permissions.has("DEAFEN_MEMBERS"))
      var x13 = `<a:hayirgif:787990150331760641>`;
    //üyeleri taşı
    if(kişi.permissions.has("MOVE_MEMBERS"))
       var x14 = `<a:evetgif:787990148225957909>`;
    if(!kişi.permissions.has("MOVE_MEMBERS"))
        var x14 = `<a:hayirgif:787990150331760641>`;
	//öncelikli konuşmacı
    if(kişi.permissions.has("PRIORITY_SPEAKER"))
        var x15 = `<a:evetgif:787990148225957909>`;
    if(!kişi.permissions.has("PRIORITY_SPEAKER"))
        var x15 = `<a:hayirgif:787990150331760641>`;
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`${msg.author.tag}'ın Yetkileri`)
        .addField(`<a:yetkili:791609978876067880> **Genel Yetkiler**`,`${x} Yönetici \n${x2} Denetim Kaydını Görüntüle\n${x3} Sunucuyu Yönet \n${x4} Rolleri Yönet \n${x5} Kanalları Yönet \n${x6} Üyeleri At \n${x7} Üyeleri Yasakla \n${x8} Mesajları Yönet \n${x9} Kullanıcı Adlarını Yönet \n${x10} Emojileri Yönet \n${x11} Webhook'ları Yönet`)
        .addField(`<a:yetkili:791609978876067880> **Diğer Yetkiler**`,`${x12} Üyeleri Sustur\n${x13} Üyeleri Sağırlaştır\n${x14} Üyeleri Taşı\n${x15} Öncelikli Konuşmacı`)
        .setFooter(msg.author.tag, msg.author.displayAvatarURL({dynamic: true}));

    return msg.channel.send(embed);
	// EnesEmre#2977 Tarafından Yapılmıştır.
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yetkilerim"],
    permLevel: 0,
};

exports.help = {
    name: "yetkilerim",
    description:
        "Komutu kullandığınız sunucudaki yetkilerinizi/izinlerinizi gösterir.",
    usage: "yetkilerim"
};
