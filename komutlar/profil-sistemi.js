const Discord = require ("discord.js");
let config = require("../utils/errors.js");

exports.run = (client, message) => {

const AsreaperEMBED = new Discord.MessageEmbed()

.setColor("GREEN")
.setTitle(" **Ripper Bot**")
.setDescription(`

** Profil Sistemi | Komut Listesi**
**-------------------------------------------------**
**• r!bayrak-ayarla :**   Profil bayrağı belirtir.  
**• r!cinsiyet-ayarla :** Profil cinsiyet belirtir. 
**• r!isim-ayarla :** Profil ismini belirtir.       
**• r!soyisim-ayarla :**  Profil soy ismi belirtir. 
**• r!yaş-ayarla :** Profil yaşı belirtir.          
**• r!profil :**  Kişinin profilini gösterir.          
**-------------------------------------------------**
`)

.setFooter(client.user.username + "", client.user.avatarURL)
.setTimestamp();

return message.channel.send(AsreaperEMBED)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'profilsistemi', 
    description: 'yardım',
    usage: 'yardım'
};