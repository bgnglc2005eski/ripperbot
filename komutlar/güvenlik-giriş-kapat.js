const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`**kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)

const erorrEmbed = new Discord.MessageEmbed().setTitle('Bir hata oldu!').setColor('#00001');
message.channel.send(erorrEmbed.setTitle('Başarılı!')
.setDescription('Sunucudaki ``Giriş Güvenlik`` Sistemi Başarıyla Kapatıldı'));

  
db.delete(`hggvnl_${message.guild.id}`, message.mentions.channels.first());
db.delete(`hggvnl_${message.guild.id}`, args[1]);

  
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'güvenlik-giriş-kapat'
};