const Discord = require("discord.js"),
client = new Discord.Client();

const db = require("quick.db");
module.exports.run = async (client, message, args) => {

var yetkiliRolID;
var yetkiliIzinIsmi;
var spotifyEngel;

spotifyEngel = await db.fetch("spotifyEngel");

yetkiliRolID = "848578949118165012" || "785058327314038805";
yetkiliIzinIsmi = "ADMINISTRATOR" || "ADMINISTRATOR";

let reynEmbed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Ripper Bot", message.guild.iconURL({dynamic: true})).setColor("010000")

if (!message.member.roles.cache.has(yetkiliRolID) && !message.member.hasPermission(yetkiliIzinIsmi)) return message.channel.send(":no_entry_sign: Yeterli izinlere sahip değilsin!");

if (!spotifyEngel) {
db.set("spotifyEngel", true);
message.channel.send(reynEmbed.setDescription(`Spotify engel başarıyla aktif edildi!`));
return;
} else if (spotifyEngel) {
db.delete("spotifyEngel");
message.channel.send(reynEmbed.setDescription(`Spotify engel başarıyla devre dışı bırakıldı!`));
return;
}
};


client.on("message", async reyn => {

let spotifyEngel = await db.fetch("spotifyEngel");
let reynEmbed = new Discord.MessageEmbed().setAuthor(reyn.member.displayName, reyn.author.avatarURL({dynamic: true})).setFooter("Ripper Bot", reyn.guild.iconURL({dynamic: true})).setColor("010000")

if (!spotifyEngel) return;

if (spotifyEngel) {
if (!reyn.activity) return;
if (reyn.activity.partyID.startsWith("spotify:")) {
reyn.delete();
reyn.channel.send(reyn.setDescription(`:no_entry_sign: Spotify parti daveti paylaşmak yasak!`));
}
}
})

exports.conf = {
    aliases: ['spoengel'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'spodavetengel'
  };