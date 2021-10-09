const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client ,message, args) =>{
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`❌ Bu Komutu Kullana Bilmek İçin \`Yönetici\` Yetkisine Sahip Olmalısın!`)
if(args[0] === 'aç') {
    db.set(`${message.guild.id}.etiketengel`, true)
    message.channel.send(`**✅ Başarılı!**\n🔶 Efendim! Kimsenin Sizi Rahatsız Etmesene İzin Vermeyeceğim..`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`${message.guild.id}.etiketengel`)
message.channel.send(`**✅ Başarılı!**\n🔶 Artık Size Herkes Etiket Atabilecek..`)
return
}
  message.channel.send('🔴 **Hata!** Lütfen Komutu Doğru Kullanın!')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [], 
 permLevel: 0
};

exports.help = {
 name: 'etiket-engel'
};