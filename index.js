const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Ripper Bot pinglendi.");
  response.sendStatus(200);
});
//app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token)
//////////////////////////////////////////////
client.ayarlar = {
"durum":"dnd",//online , idle , dnd 
"oynuyor":"Youtube: EnoRipper",
}
client.ekoayarlar = {
  parabirimi: "TL", //Para Birimi TL İsterseniz Dolar Euro Vb. Para Birimleri Girebilirsiniz.
  botunuzunprefixi: "!",
  botunuzunidsi: "782983274830102528",
  botismi: "V12 Ekonomi Botu",
  renk: "RANDOM", //İNGİLİZCE TERCİH ETTİĞİNİZ RENGİ YAZINIZ! EĞER BÖYLE BIRAKIRSANIZ RASTGELE ATAR!
  isimsiz: "Bilinmiyor", //İSİMSİZ KİŞİLERİN HANGİ İSİM İLE GÖZÜKECEĞİNİ BELİRLEYEBİLİRSİNİZ!
  rastgelepara: true, //EĞER BUNU TRUE YAPARSANIZ RASTGELE PARA VERME ÖZELLİĞİ AKTİF OLUR VE GÜNLÜK PARALARI RASTGELE VERİR!
  minpara: 10, //EĞER RASTGELE PARA DURUMUNU AKTİF ETTİYSENİZ BURADAN RASTGELE PARA PARAMETRESİNİNİN MİNUMUM PARASINI BELİRTİNİZ!
  maxpara: 200, //EĞER RASTGELE PARA DURUMUNU AKTİF ETTİYSENİZ BURADAN RASTGELE PARA PARAMETRESİNİNİN MAXİMUM PARASINI BELİRTİNİZ!
  günlükpara: 50, //EĞER RASTGELE PARAYI TRUE YAPTIYSANIZ BURAYI ELLEMENİZE GEREK YOK!
  dbloy: false, //EĞER BOTUNUZ DBL (DİSCORD BOT LİST) DE KAYITLIYSA GÜNLÜK ÖDÜL ALMAK İÇİN OY İSTER FALSE KAPALI, TRUE AKTİF DEMEK!
  dblkey: "KEY", //EĞER DBLOY U AKTİF ETMEDİYSENİZ BURAYA KEY EKLEMENİZE GEREK YOK EĞER AKTİF ETTİYSENİZ DBL SİTESİNDEN BULABİLİRSİNİZ!
  dblmsj: "Bu komutu kullanabilmek için bota oy vermelisiniz. Oy vermek için !oyver", //EĞER DBLOY U AKTİF ETMEDİYSENİZ BURAYA MESAJ YAZMANIZA GEREK YOK! EĞER AKTİF ETTİYSENİZ BOTA OY VERMEK İÇİN HANGİ MESAJI YAZACAĞINI AYARLAYABİLİRSİNİZ.
  başlangıçparası: 50, //EĞER RASTGELE PARAYI TRUE YAPTIYSANIZ BURAYI ELLEMENİZE GEREK YOK!
  admin: ["721126378833051670"]//["id","",""]
}

///reklam-engel

const reklam = [
  ".com",
  ".net",
  ".xyz",
  ".tk",
  ".pw",
  ".io",
  ".me",
  ".gg",
  "www.",
  "https",
  "http",
  ".gl",
  ".org",
  ".com.tr",
  ".biz",
  "net",
  ".rf",
  ".gd",
  ".az",
  ".party",
".gf"
];
client.on("messageUpdate", async (old, nev) => {

if (old.content != nev.content) {
let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
if (i) {

if (reklam.some(word => nev.content.includes(word))) {
if (nev.member.hasPermission("BAN_MEMBERS")) return ;
 //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
const embed = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` ${nev.author} , **Mesajını editleyerek reklam yapmaya çalıştı!**`)
      .addField("Mesajı:",nev)
  
      nev.delete();
      const embeds = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` ${nev.author} , **Mesajı editleyerek reklam yapamana izin veremem!**`) 
    client.channels.cache.get(y).send(embed)
      nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
    
}
} else {
}
if (!i) return;
}
});

client.on("message", async msg => {


if(msg.author.bot) return;
if(msg.channel.type === "dm") return;
   let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);

let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
    if (i) {
        if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
          try {
           if (!msg.member.hasPermission("MANAGE_GUILD")) {
           //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
msg.delete({timeout:750});
              const embeds = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` <@${msg.author.id}> , **Bu sunucuda reklam yapmak yasak!**`)
msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
          const embed = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` ${msg.author} , **Reklam yapmaya çalıştı!**`) .addField("Mesajı:",msg)
         client.channels.cache.get(y).send(embed)
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
   if(!i) return ;
});


//reklam engel son //

client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor(0x36393F)
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor(0x36393F)
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan atıldı ve yasaklanan kişinin yasağı kalktı. `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "TR_tr") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor(0x36393F)
      .addField(`Silen:`, entry.executor.tag)
      .addField(`Silinen Rol:`, role.name)
      .addField(`Sonuç:`, `Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor(0x36393F)
      .addField(`Silen:`, entry.executor.tag)
      .addField(`Silinen Rol:`, role.name)
      .addField(`Sonuç:`, `Silinen Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});




/// modlog sistemi

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

  .addField("**Eylem:**", "Mesaj Düzenleme")

  .addField("**Mesajın sahibi:**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

  .addField("**Eski Mesajı:**", `${oldMessage.content}`)

  .addField("**Yeni Mesajı:**", `${newMessage.content}`)

  .setTimestamp()

  .setColor(0x36393F)

  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

  .setThumbnail(oldMessage.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

});

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor(0x36393F)

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor(0x36393F)

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi:**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol:**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Rol Silme")

.addField("**Rolü silen kişi:**", `<@${entry.executor.id}>`)

.addField("**Silinen rol:**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi:**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Silme")

.addField("**Emojiyi silen kişi:**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji:**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi:**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji:**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji:**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili:**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı:**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi:**", `${entry.reason}`)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili:**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı:**", `**${user.tag}** - ${user.id}`)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})
// mod log son ///

// çekiliş sistemi

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }//#FF0000
});

//// otorol sistemi

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;
const ayarlar = new Discord.MessageEmbed()
.setColor("BLUE")
.setTimestamp()
.setFooter(`ayarlar`)
.setDescription( " **" +
          member.user.username +
          "** hoş geldin! Otomatik rolün verildi. Seninle beraber **" +
          member.guild.memberCount +
          " **kişiyiz!")
  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(ayarlar);
    return member.roles.add(rol);
  }

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-rol-", `${member.guild.roles.cache.get(rol).name}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    return client.channels.cache.get(kanal).send(mesajs);
  }
});

//////


// spam engel

const dctrat = require('dctr-antispam.js'); 

var authors = [];
var warned = [];

var messageLog = [];

client.on('message', async message => {
const spam = await db.fetch(`spam.${message.guild.id}`);
if(!spam) return;
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
  const ayarlarHerDaim = new Discord.MessageEmbed()
  .setColor(0x36393F)
  .setDescription(` <@${message.author.id}> , **Bu sunucuda spam yapmak yasak!**`)
 // .setFooter(`Bu mesaj otomatik olarak silinecektir.`)
 if (message.member.hasPermission("BAN_MEMBERS")) return ;
 message.channel.send(ayarlarHerDaim).then(msg => msg.delete({timeout: 1500}));
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500) // default : 500
}


});


/////

/ AYARLANABİLİR KAYIT KANAL //
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** ";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** ";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif"];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor(0x36393F)
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

 //
  .setDescription(` **Hoş geldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n  Kaydının yapılması için **isim** ve **yaş** yazman gerek. \n  Hesap kuruluş tarihi: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}** \n  Bu vatandaş: ${kontrol} \n  <@&${kayıtçı}> rolündeki yetkililer sizinle ilgilenecektir.`);
  //
  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`);
});
  
//kayıt kanal son //


/// modlog sistemi

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

  .addField("**Eylem:**", "Mesaj Düzenleme")

  .addField("**Mesajın sahibi:**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

  .addField("**Eski Mesajı:**", `${oldMessage.content}`)

  .addField("**Yeni Mesajı:**", `${newMessage.content}`)

  .setTimestamp()

  .setColor(0x36393F)

  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

  .setThumbnail(oldMessage.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

});

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor(0x36393F)

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor(0x36393F)

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi:**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol:**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Rol Silme")

.addField("**Rolü silen kişi:**", `<@${entry.executor.id}>`)

.addField("**Silinen rol:**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi:**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Silme")

.addField("**Emojiyi silen kişi:**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji:**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor(0x36393F)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi:**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji:**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji:**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili:**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı:**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi:**", `${entry.reason}`)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem:**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili:**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı:**", `**${user.tag}** - ${user.id}`)

.setTimestamp()

.setColor(0x36393F)

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})
// mod log son ///

//küfür engel //

const küfür = [
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yarra",
        "yarrak",
        "amcık",
        "orospu",
        "orosbu",
        "orosbucocu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşşak",
		"sikm",
		"sikim",
		"sikmm",
		"skim",
		"skm",
		"sg"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (küfür.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` ${nev.author} , **Mesajını editleyerek küfür etmeye çalıştı!**`)
            .addField("Mesajı:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` ${nev.author} , **Mesajı editleyerek küfür etmene izin veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
          if (i) {
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` <@${msg.author.id}> , **Bu sunucuda küfür yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor(0x36393F) .setDescription(` ${msg.author} , **Küfür etmeye çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});

//küfür engel son //


 
/////////////
//----------------------------------Özel oda sistemi----------------------------// 
client.on('message', async message => {
  const ms = require('ms');
  const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "özeloda") {
  if (message.guild.channels.cache.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Özel Oda Sisteminin Kurulmasını İstiyorsanız **Kur** Yazınız.`)
      message.channel.awaitMessages(response => response.content === 'Kur', {
        max: 1,
        time: 10000,
        errors: ['time'],
     })
    .then((collected) => {

message.guild.channels.create('【🔐】2 Kişilik Odalar【🔐】', 'category', [{
  id: message.guild.id,
}]);

message.guild.channels.create(`➕│2 Kişilik Oda`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】2 Kişilik Odalar【🔐】")))

message.guild.channels.create('【🔐】3 Kişilik Odalar【🔐】', 'category', [{
  id: message.guild.id,
}]);

message.guild.channels.create(`➕│3 Kişilik Oda`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】3 Kişilik Odalar【🔐】")))

message.guild.channels.create('【🔐】4 Kişilik Odalar【🔐】', 'category', [{
  id: message.guild.id,
}]);

message.guild.channels.create(`➕│4 Kişilik Oda`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】4 Kişilik Odalar【🔐】")))

message.guild.channels.create('【🔐】5 Kişilik Odalar【🔐】', 'category', [{
  id: message.guild.id,
}]);
message.guild.channels.create(`➕│5 Kişilik Oda`, 'voice')
.then(channel =>
      channel.setParent(message.guild.channels.cache.find(channel => channel.name === "【🔐】5 Kişilik Odalar【🔐】")))
       message.channel.send("Özel Oda Sistemi Aktif")
     
            })   
      
}
});
//----------------------------------Özel oda sistemi Son--------------------------

client.on("guildMemberAdd", async(member) => {
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })
  
  client.on("guildMemberRemove", async(member) => {
    let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
    if(sunucupaneli) {
      let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
      let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
      let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
      let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
      let rekoraktif = member.guild.channels.
      find(x =>(x.name).startsWith("Rekor Aktiflik •"))
      
      if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
        db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
      }
      try{
        toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
        toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
        botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
        rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
     } catch(e) { }
    }
  })


client.on('guildCreate', guild => {

    let ayarlar1 = guild.channels.filter(c => c.type === "text").random()
    ayarlar1.send("**Ripper Botunu Sunucuya Eklediğiniz İçin Teşekkürler!** \n r!yardım Yazarak Yardım Menüsüne Erişebilirsiniz!");

});
client.on("guildCreate", async guild => {
  const ayarlar2 = [
    "Botumuzu Sunucuna Eklediğin İçin Teşekkürler!",
    "Bu Bot MerttRipper Tarafından Geliştirilmiştir!",
    'r!yardım Yazarak Yardım Menüsüne Ulaşabilirsin'
  ];
  guild.owner.send(ayarlar2);
  console.log(`LOG: ${guild.name}. sunucuya katıldım!`);
});
client.on("message", async msg => {


  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 's.a.' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'slm') {
          try {

                  return msg.lineReply('**Aleyküm Selam, Hoşgeldin.! ^^ <:oley:853383678654939197>** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });

	const emmmmbed = new Discord.MessageEmbed()
  .setThumbnail()
  .setImage(
    "https://media.discordapp.net/attachments/860203436779634729/868103648104837130/standard_5.gif"
  )
  .addField(
    `Ripper Bot | Teşekkürler`,
    `**Selamlar, Ben Mert (Ripper Bot'un Geliştiricisi) Öncelikle Botumuzu Eklediğiniz ve Bize Destek Olduğunuz İçin Sizlere Teşekkürlerimi Sunarım. Botumuz 1. kere 9.03.2021 ve 2. olarak 03.04.2021 tarihinde hacklendi**`
  )
  .addField(
    `Ripper Bot | Açıklama`,
    `**Ripper Bot projemizin 2 oldu tokeni sızdırılıyor. sebebini bilmiyoruz ama düzeltmek için canla başla çalışıyor bulunmaktarız. Desteklerinizle ayaktayız.**`
  )
  .addField(
    `Ripper Bot | Nasıl Kullanılır?`,
    `**botun tüm özelliklerinden yararlanabilmek için sadece \`r!yardım\` yazmanız yeterlidir.**`
  )
  .addField(
    `Ripper Bot | Linkler`,
    `**Sohbet Kanalına r!davet Yazmanız Yeterlidir**`
  )
  .setFooter(`Ripper Bot | Gelişmiş Türkçe Bot | 2021`)
  .setTimestamp();

client.on("guildCreate", guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(emmmmbed);
});
client.on("message", async msg => {
  const i = await db.fetch(`otocvp_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "ii" ||
      msg.content.toLowerCase() == "iyi" ||
      msg.content.toLowerCase() == "iyidir" ||
      msg.content.toLowerCase() == "iyiyim" ||
      msg.content.toLowerCase() == "iyi sen"
    ) {
      try {
        return msg.reply("İyi bende yaşamaya çalışıyorum");
      } catch (err) {
        console.log(err);
      }
    }
    if (
      msg.content.toLowerCase() == "bok gibi" ||
      msg.content.toLowerCase() == "kötü" ||
      msg.content.toLowerCase() == "iğrenç" ||
      msg.content.toLowerCase() == "kötüyüm" ||
      msg.content.toLowerCase() == "kötüyüm sen"
    ) {
      try {
        return msg.reply("Neden kötüsün dostum? Dahada kötü oldum :sob:");
      } catch (err) {
        console.log(err);
      }
    }
    if (
      msg.content.toLowerCase() == "nasıl çalışıyorsun" ||
      msg.content.toLowerCase() == "yardım" ||
      msg.content.toLowerCase() == "<@!832231157189574676>" ||
      msg.content.toLowerCase() == "RipperBot" ||
      msg.content.toLowerCase() == "çalış" ||
	  msg.content.toLowerCase() == "Ripper Bot"
    ) {
      try {
        return msg.reply(
          "Beni kullanmaya mı çalışıyorsun? Hemen sana bahsedeyim. Prefix yani ön ekim `r!` \n Benimle ilgili bilgiyi `r!yardım ` yazarak alabilirsin."
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (
      msg.content.toLowerCase() == "bum" ||
      msg.content.toLowerCase() == "bum be" 
    ) {
      try {
        return msg.reply(
          "bum be yarag"
        );
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});
client.on('message', message => {
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
if (message.mentions.users.first()) { if (message.mentions.users.first().id === client.user.id){ 
const sametigötten = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`**__Ripper|Bot__**`, client.user.avatarURL())
.setDescription(`**\`@${client.user.username}\` Adlı Rolümü Üstte Tutmayı Unutma
<a:soru:870684572642324560> **|** __Hey, Ben Ripper Bot!__**
<a:yildiz:870684994484437012> **|** Sunucunu Daha Kullanışlı Hale Getirmek İçin Burdayım!
<a:okv2:870685301859840021> **|** Bot Prefixi: \`${prefix}\`
<a:okv2:870685301859840021> **|** Tüm Komutlarımı Görmek İçin \`${prefix}yardım\` Yazman Yeterlidir!
<a:Yklenme:826079205011226695> **|** Prefix Değiştirmek İçin \`${prefix}prefix <Yeni-Prefix>\`,
<a:Yklenme:826079205011226695> **|** Prefixi Sıfırlamak İçin \`${prefix}prefix Sıfırla\` Yazman Yeterlidir!
<a:Yklenme:826079205011226695> **|** Şuaki Pingim: \`${client.ws.ping}ms\` !`)
.setFooter(`${message.author.username} İstedi.`, message.author.displayAvatarURL({dynamic: true}))
.setImage("https://media.discordapp.net/attachments/852868398902935593/870687781909823488/standard_1.gif")
message.channel.send(sametigötten)
}}});
    let nightcode = ayarlar.sahip // Bu Kısma Etiket Atılmasını İstemediğiniz Kişinin ID'sini Yazın!
    client.on("message", async msg => {
      const night = await db.fetch(`${msg.guild.id}.etiketengel`);
      if (night) {
        const kec = [
          `<@!${nightcode}>`
        ];
        if (kec.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("ADMINISTRATOR")) {
              msg.delete();
    
              return msg
                .reply("‼️ Heey! Patronum Şu Anda Rahatsız Edilmek İstemiyor!")
                .then(code => code.delete({ timeout: 5000 }));
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
      if (!night) return;
    });
	const disbut = require ("discord-buttons")
disbut(client);
const logs = require('discord-logs');
logs(client);
client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
  const { Database } = require('nukleon');
  const db = new Database("plasmic.json");
  let log = db.fetch(`boostlog_${guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('Sunucu boost seviyesi atladı!')
  .setDescription(`Sunucumuz ${guild.name} artık ${newLevel} boost seviyesinde tebrikler!`)
client.channels.cache.get(log).send(embed)
});
client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
  const { Database } = require('nukleon');
  const db = new Database("plasmic.json");
  let log = db.fetch(`boostlog_${guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('Sunucu boost seviyesi düştü!')
  .setDescription(`Sunucumuz ${guild.name} artık ${newLevel} boost seviyesinde üzdü :(`)
client.channels.cache.get(log).send(embed)
});
client.on("guildMemberBoost", (member) => {
  const { Database } = require('nukleon');
  const db = new Database("plasmic.json");
  let log = db.fetch(`boostlog_${member.guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('Sunucumuza boost basıldı!')
  .setDescription(`<@${member.id}> adlı kullanıcı sunucumuza boost bastı teşekkürler!`)
client.channels.cache.get(log).send(embed)
});
client.on("guildMemberUnboost", (member) => {
  const { Database } = require('nukleon');
  const db = new Database("plasmic.json");
  let log = db.fetch(`boostlog_${member.guild.id}`)
  if(!log) return
  const embed = new Discord.MessageEmbed()
  .setTitle('Sunucumuzdan boost çekildi!')
  .setDescription(`<@${member.id}> adlı kullanıcı sunucumuzdan boostunu çekti üzdü :(`)
client.channels.cache.get(log).send(embed)
})
client.on("guildMemberRemove", async member => {
  const Discord = require('discord.js')
  const Canvas = require('canvas')
  const db = require('quick.db')
  const arezhesapkurulus = new Date().getTime()- client.users.cache.get(member.id).createdAt.getTime();
  let kuruluş;
  if (arezhesapkurulus < 1296000000) kuruluş = ' Şüpheli'
  if (arezhesapkurulus > 1296000000) kuruluş = ' Güvenli'
  const canvas = Canvas.createCanvas(810, 450);
    const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage(`/app/assets/canvasgiriscikis.png`);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({dynamic: true, format: "png"}))
  ctx.drawImage(avatar, 307, 35, 175, 175)
  ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.user.tag}` , 290, 269);
  ctx.font = '43px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Kullanıcı adı:` , 15, 270);
  ctx.font = '43px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Durumu:` , 15, 325);
  ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${kuruluş}` , 200, 323.5);
/*  ctx.font = '43px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Hesabın kuruluş tarihi:` , 15, 390);
*/ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${moment(member.user.createdAt).format("DD MMMM YYYY hh:mm:ss") }` , 17, 375);
  ctx.font = '50px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`#${member.guild.memberCount}` , 550, 100);
  ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Sunucudan ayrıldı!` , 15, 440);
  ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`Âréz & Âlés & Serialy` , 500, 440);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'arezck.png');
  const kanal = db.fetch(`canvashg-bb_${member.guild.id}`)
  var kanalcık = member.guild.channels.cache.get(kanal)
  if(!kanalcık) return;
  kanalcık.send(attachment)
})
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})
//sahibim geldi
client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 500000//süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = ayarlar.sahip
          if (msg.author.id == i) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
  var embed = new Discord.MessageEmbed()
  .setDescription(`<:oley:853383678654939197> İşte benim **Sahibim Burada Aç Yolu**! <@${msg.author.id}>`)
  .setColor("YELLOW")
   msg.channel.send(embed)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});

////--------------------GUVENLIK----------------////
client.on("guildMemberAdd", async member => {
  var rahzamgvnl = `<@${member.id}>`
  var rahzam = await db.fetch(`hggvnl_${member.guild.id}`)
  let user = client.users.cache.get(member.id);
  let kullanıcı = client.users.cache.get(member.id)
  const hesapkk = new Date().getTime()- kullanıcı.createdAt.getTime();
  const tmbb = new Date().getTime()- kullanıcı.createdAt.getTime();
    let durum;
  if (hesapkk < 1296000000) durum = 'Şüpheli!'
  if (hesapkk > 1296000000) durum = 'Güvenli!'
  if(!rahzam) return;
  let tmb;
  if (tmbb < 1296000000) tmb = 'https://cdn.discordapp.com/attachments/831129091519414272/831133013248442438/carp.png'
  if (tmbb > 1296000000) tmb = 'https://cdn.discordapp.com/attachments/831129091519414272/831133016024940554/tik.png'
  if(!rahzam) return;
    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setThumbnail(tmb)
    .setDescription(`
    
    
      ${rahzamgvnl} Sunucuya Katıldı!
      
      Güvenlik Durumu : **${durum}**
    
      Hesabının Kuruluş Tarihi:   ${moment(member.user.createdAt).format("**DD MMMM YYYY**") }
    
    
    `)
  

    client.channels.cache.get(rahzam).send(embed);
  })


client.on("guildMemberRemove", async member => {
  var rahzamgvnl = `<@${member.id}>`
  var rahzam = await db.fetch(`bbgvnl_${member.guild.id}`)
  let user = client.users.cache.get(member.id);
  let kullanıcı = client.users.cache.get(member.id)
  const hesapkk = new Date().getTime()- kullanıcı.createdAt.getTime();
  const tmbb = new Date().getTime()- kullanıcı.createdAt.getTime();
    let durum;
  if (hesapkk < 1296000000) durum = 'Şüpheliydi!'
  if (hesapkk > 1296000000) durum = 'Güvenliydi!'
  if(!rahzam) return;

  let tmb;
  if (tmbb < 1296000000) tmb = 'https://cdn.discordapp.com/attachments/831129091519414272/831133013248442438/carp.png'
  if (tmbb > 1296000000) tmb = 'https://cdn.discordapp.com/attachments/831129091519414272/831133016024940554/tik.png'
  if(!rahzam) return;
    const embed = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setThumbnail(tmb)
    .setDescription(`
    
    
      ${rahzamgvnl} Sunucudan Ayrıldı!
      
      Güvenlik Durumu : **${durum}**
    
      Hesabının Kuruluş Tarihi:   ${moment(member.user.createdAt).format("**DD MMMM YYYY**") }
    
    
    `)
  
    client.channels.cache.get(rahzam).send(embed);
  })
////-------------------GUVENLIK----------------////
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
    const info = db.get(`afk-${message.author.id}+${message.guild.id}`);
    db.delete(`afk-${message.author.id}+${message.guild.id}`);
    if (message.guild.owner.id !== message.author.id) {
      message.member.setNickname(null)
    }
    message.lineReply(`Hoş geldin ${message.author}, AFK'nı kaldırdım`);
  }
  if (message.mentions.members.first()) {
    if (
      db.has(
        `afk-${message.mentions.members.first().id}+${message.guild.id}`
      )
    ) {
      message.lineReply(
        `${message.mentions.members.first().user.tag} adlı kullanıcı AFK: ` +
          db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
      );
    } else return;
  } else;
})
client.on("message", async message => {
if(message.author.id !== "848578949118165012") return
await message.react("<a:kral:844646285764329543>")
})
client.on('voiceStateUpdate', async (oldState, newState) => {
if (newState.member.user.bot && newState.channelID && newState.member.user.id == client.user.id && !newState.selfDeaf) 
{newState.setSelfDeaf(true)}
});
client.on("guildCreate", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "848578949118165012" //Eklendim mesajının atılacağı kanal ID'sini giriniz.
const ottoman = new Discord.MessageEmbed()
.setTitle(`Yeni bir sunucuya eklendim`)
.setColor("YELLOW")
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: ottoman}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})
//
  
//Atıldım
client.on("guildDelete", async function(guild) {
const owner = client.users.cache.get(guild.ownerID)
const kanal = "848578949118165012" //Atıldım mesajının atılacağı kanal ID'sini giriniz.
const ottoman = new Discord.MessageEmbed()
.setTitle(`Bir sunucudan atıldım`)
.setColor("RED")
.addField(`Sunucu Adı`, guild.name)
.addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)
.addField(`Sunucu Üye Sayısı`, guild.memberCount)
client.channels.cache.get(kanal).send({embed: ottoman}).catch(err => console.log("Kanala mesaj atamıyorum!"))
})