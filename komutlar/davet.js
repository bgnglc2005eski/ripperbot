const  Discord = require("discord.js"); 

exports.run = (client, message, args) => {

  const davet = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Ripper Bot Davet Menüsü")
  .setDescription("[__**Botu Davet Et**__](https://discord.com/oauth2/authorize?client_id=832231157189574676&permissions=8&scope=bot) \n [__**Destek Sunucusu**__](https://discord.gg/ripper) \n [__**Bota Oy Ver**__](https://top.gg/bot/832231157189574676/vote)")
  .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
  .setFooter(`${message.author.username} komutu kullandı.`, message.author.displayAvatarURL({dynamic: true}))
  message.lineReply(davet)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: '',
  usage: ''
};