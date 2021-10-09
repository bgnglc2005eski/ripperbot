const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../utils/errors.js");

exports.run = async (client, message, args) => {

let cinsiyet = args[0]
if (!cinsiyet) return message.channel.send(
      "**Ripper Bot** \n  \n**Lütfen cinsiyetinizi belirtin.** \n **Örnek:** **r!cinsiyet-ayarla** `(Cinsiyet)` \n`**Tüm komutlara erişmek için -> r!yardım** \n\n**Ripper Bot**"
    );

 db.set(`Ripper BotCinsiyet_${message.author.id}`, cinsiyet)
  message.channel.send("**Ripper Bot** \n**------------------------------------**  \n **• Cinsiyet başarıyla ayarlandı.** \n **• Belirtilen Cinsiyet ->** `" + 
  cinsiyet +
  "` \n`• r!yardım` **Yazarak tüm komutlara erişebilirsiniz.** \n **------------------------------------**\n**Ripper Bot**"
  );


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "Profil"
};

exports.help = {
  name: "cinsiyet-ayarla",
  description: "cinsiyet-ayarla",
  usage: "cinsiyet-ayarla",
  kategori: "Profil"
};
