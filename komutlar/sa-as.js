const db = require('quick.db')
const Discord = require('discord.js')
 
 
exports.run = async (bot, message, args) => {

  const fynx = require("..//ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix 
  
  if (!args[0]) return message.channel.send(`Aç yada kapat yazmalısın!! Örnek: **${prefix}sa-as aç**`)
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: **Bu komutu kullanmak için \`MESAJLARI_YÖNET\` yetkisine sahip olmalısın!**')
 
  if (args[0] === 'aç') {
    
    db.set(`ssaass_${message.guild.id}`, 'acik')
    message.channel.send(`<:yes:827259552298303559>  **Artık bot Sa diyince As diyecek. Kapatmak için "\`${prefix}sa-as kapat\`" yazmalısın.**`)
 
  }
  
  if (args[0] === 'kapat') {
    
    db.set(`ssaass_${message.guild.id}`, 'kapali')
    message.channel.send(`<:yes:827259552298303559> **Artık biri sa diyince cevap vermeyecek.**`)

  }
 
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sa-as-sistemi"],
  permLevel: 0
};
exports.help = {
  name: 'sa-as',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};
