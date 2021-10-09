const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../utils/errors.js");

exports.run = async (client, message, args) => {

let soyisim = args.slice(0).join(" ");
if (!soyisim)

return message.channel.send(
 "**Ripper Bot**\n\n**Lütfen soy ismini belirtin.** \n・**Örnek:** **r!soyisim-ayarla** `(Soyisim)` \n・`**Tüm komutlara erişmek için -> r!yardım**\n\n**Ripper Bot** "
    );
db.set(`Ripper BotSoyisim_${message.author.id}`, soyisim)
return message.channel.send(
    " **Ripper Bot** \n**------------------------------------**\n**• Soy isim başarıyla ayarlandı.** \n**• Belirtilen Soy İsim ->** `" +
    soyisim +
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
  name: "soyisim-ayarla",
  description: "soyisim-ayarla",
  usage: "soyisim-ayarla",
  kategori: "Profil"
};
