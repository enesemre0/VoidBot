const Discord = require("discord.js");
const moment = require("moment");
const talkedRecently = new Set();
const db = require("quick.db");
exports.run = async (bot, message, args) => {
    let enes = await db.fetch(`banyetkili_${message.author.id}`)
    let rol = await message.guild.roles.cache.get(enes)
    if (!rol)
        return message.channel.send(
            new Discord.MessageEmbed()
                .setColor("BLACK")
                .addField(
                    "<a:hayr:788724069335957506> Hata",
                    `•\`-ban\` Kullanabilmek için , \`-ban-yetkili de ayarlanmış olan\` **Role  sahip olmanız gerekir**.`
                )
                .setImage(
                    "https://cdn.discordapp.com/attachments/764488757637283870/765161035219992596/IMG_20201012_133635_063.jpg"
                )
        );
    let guild = message.guild;
    let modlog = await db.fetch(`mlogg_${message.guild.id}`);
    if (!modlog)
        return message.channel.send(new Discord.MessageEmbed().setTitle("enes").setDescription("**Ayarlı Bir Ban Log Kanalı Bulunmamaktadır! Ayarlamak İçin** `-ban-log #kanal` \n **Ayarlı Bir Ban Yetkili Rolu Bulunmamaktadır! Ayarlamak İçin `-ban-yetkili @banyetkilisi`** ").setTimestamp().setColor("ff0000"));
    if (message.channel.type == "dm") return;
    if (message.channel.type !== "text") return;
    if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
            "** Bu komudu kullanabilmek için `Ban` yetkisine sahip olmanız gerek**."
        );
    let reason = args.slice(1).join(" ");
    if (!args[0])
        return message.channel.send(
            "**Yasaklamak istediğiniz kullanıcıyı etiketleyiniz.** <a:ban:759147136251330610>"
        );
    let user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    if (!user)
        return message.channel.send(
            `<a:uyar:788054399208652840> Etiketlediğin kullanıcıyı sunucuda bulamadım.`
        );
    let member = message.guild.member(user);
    if (!member)
        return message.channel.send(
            `<a:uyar:788054399208652840> Etiketlediğin kullanıcıyı sunucuda bulamadım.`
        );
    if (member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(`Etiketlediğin Kişi Sunucuda Yetkili!`);
    if (!args[1]) return message.channel.send("**Bir Sebep Girmedin!** <a:ban:759147136251330610>");
    user.send(
        `**${message.guild.name}** adlı sunucudan **banlandınız!**\n*Sebep:* \`\`\`${reason}\`\`\``
    );
    guild.members.ban(user, {
        reason: reason + ` | Yetkili: ${message.author.tag} - ${message.author.id}`
    });
    message.channel.send(`**${user.tag}** adlı kullanıcı sunucudan yasaklandı.`);
    let embed = new Discord.MessageEmbed()

        .setThumbnail(user.avatarURL() || user.defaultAvatarURL())
        .setColor("RED")
        .setTimestamp()
        .setAuthor(
            `Başarılı! ${user.username} adlı kişi Banlandı!. <a:ban:759147136251330610>`,
            user.avatarURL() || user.displayAvatarURL()
        )
        .addField("Eylem:", "`Ban`")
        .addField(
            "Kullanıcı:",
            `\`${user.username}#${user.discriminator}\` (${user.id})`
        )
        .addField(
            "Yetkili:",
            `\`${message.author.username}#${message.author.discriminator}\``
        )
        .addField("Sebep", `\`${reason}\``);
    let mlogg = await db.fetch(`mlogg_${message.guild.id}`);

    message.guild.channels.cache.get(mlogg).send({ embed: embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ban"],
    permLevel: 0
};

exports.help = {
    name: "ban",
    description: "",
    usage: ""
};