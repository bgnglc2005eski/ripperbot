const Discord = require('discord.js');
const DBL = require("dblapi.js");
const dbl = new DBL("");
const ayarlar = require ('../ayarlar.json')
exports.run = async (client, message, args) => {

let ID = client.users.cache.get(args[0])
let member = message.mentions.users.first() || ID
  
const embed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription("Bu Komut Yapımcıma Özeldir.")
if(message.author.id !== ayarlar.sahip) return message.channel.send(embed)
  
const embed2 = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription("Lütfen Birini Etiketle Veya Bir ID Belirt.")
if(!member) return message.channel.send(embed2)

dbl.hasVoted(member.id).then(voted => {
if(voted) {

const embed3 = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription("Bu Kişi Oy Vermiş.")
message.channel.send(embed3);
} else {
const embed4 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("Bu Kişi Oy Vermemiş.")
message.channel.send(embed4)
}})
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: []
};

exports.help = {
name: 'dblkontrol'
};