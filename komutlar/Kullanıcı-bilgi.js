const Discord = require('discord.js')

exports.run = async (cleint, message, bot, args) => {

let sadecebot = message.guild.members.cache.filter(m => m.user.bot).size;
let sadeceüye = message.guild.memberCount;
let totalüye = sadeceüye - sadecebot;

const kullanıcıdurumu = new Discord.MessageEmbed()
.setColor(`#9e1a1a`)
.setDescription(`
<:online:863472713711616020>  Aktif: **${message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}** <:idle:863472808586379294>  Boşta: **${message.guild.members.cache.filter(i => i.presence.status === 'idle').size}** <:dnd:863472752115974185> Rahatsız Etmeyin: **${message.guild.members.cache.filter(dnd => dnd.presence.status === 'dnd').size}** <:offline:863472845820264459>  Çevrimdışı: **${message.guild.members.cache.filter(off => off.presence.status === 'offline').size}** <:BOT:863473486990540820> Bot: **${sadecebot}** 
`)
.setFooter(`Toplam Kullanıcı Sayısı: ${totalüye}`)
message.channel.send(kullanıcıdurumu)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["Kullanıcıbilgi"],
    permLevel: 0
}
exports.help = {
    name: "kullanıcı-bilgi",
     description: 'Sunucudaki kullanıcı istatistiklerini sergiler.',
    usage: '${orefix}kullanıcıdurumu',
} //plasmic code - 