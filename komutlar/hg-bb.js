const dc = require('discord.js');
const db = require('quick.db');
exports.run = async(client, message, args) => {
if(!args[0]) return message.channel.send("sçenek belirt  `ayarla - sıfırla`")
if(args[0] === "ayarla"){
var kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send("knal bleirtmeyeni gondiklesinler")
db.set(`canvashg-bb_${message.guild.id}`, kanal.id)
return message.channel.send("ayarladm galiba (güven testi)")
}
if(args[0] === "sıfırla"){
if(db.has(`canvashg-bb_${message.guild.id}`)){
db.delete(`canvashg-bb_${message.guild.id}`)
return message.channel.send("kanks sildim silmesine de sildiriceksen nie ayarlion ")
}
else {
return message.channel.send("silmem için ayarlaman lazm urusbu")
}
}
}
exports.conf = {
aliases: [],
permLevel: 0
};
exports.help = {
name: "hg-bb"
}