const http = require('http');
const express = require('express');
const moment = require('moment')
moment.locale("tr")
const app = express();
app.get("/", (request, response) => {
console.log(moment().format("LLLL") + " BERK //\\ CE");
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)

const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Canvas = require('canvas')
const snekfetch = require('snekfetch');
const fs = require('fs');
const db = require('quick.db')
const ms = require('parse-ms');
require('moment-duration-format')
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
console.log(`${moment().format("DD MMMM YYYY HH:mm")} ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`${files.length} adet komut yükleniyor;`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`Komut: ${props.help.name}`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});

client.reload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);
});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();
} catch (e){
reject(e);
}
});
};

client.load = command => {
return new Promise((resolve, reject) => {
try {
let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();
} catch (e){
reject(e);
}
});
};

client.unload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);
});
resolve();
} catch (e){
reject(e);
}
});
};

client.elevation = message => {
if(!message.guild) return;

let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4;
return permlvl;
};

// KODLAR BURADAN SONRA \\



client.login(ayarlar.token);
