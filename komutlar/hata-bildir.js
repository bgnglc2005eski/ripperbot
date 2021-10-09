const Discord = require('discord.js');


exports.run = function(client, message, args) {

    let mesaj = args.slice().join(' ')
if (!mesaj) return message.reply('lütfen Hata Bildirimini yazın')
message.delete()
client.users.cache.get("848578949118165012").send(new Discord.MessageEmbed()
.addField('Eylem', 'Hata Bildirimi')
.addField('Kullanıcı', message.author.tag)
.addField('Sunucu', message.guild.name)
.addField('Hata', mesaj)
).then(a => message.channel.send('<:yes:827259552298303559> ***Hatayı Bildirdiğiniz İçin Teşkkürler En Kısa Zamanda Düzelicektir İyi Günler.*** :wave:'))
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hatabildir", "hata-bildir"],
  permLevel: 0
};

exports.help = {
  name: 'bildir',
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır",
  usage: 'hata <mesaj>'
};