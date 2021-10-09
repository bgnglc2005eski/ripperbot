const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../utils/errors.js");

exports.run = async (client, message, args) => {

let bayrak = args.slice(0).join(" ");
if (!bayrak)

return message.channel.send(
 "**Ripper Bot** \n\n **Bayrak belirtin.** `(Emoji)` \**Örnek:** **r!bayrak-ayarla** :flag_tr: \n `**Tüm komutlara erişmek için -> r!yardım** \n\n**Ripper Bot**"
    );
db.set(`Ripper Botbayrak_${message.author.id}`, bayrak)
return message.channel.send(
    "**Ripper Bot** \n **------------------------------------** \n**• Bayrak başarıyla ayarlandı.** \n **• Belirtilen Bayrak ->** `" +
    bayrak +
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
  name: "bayrak-ayarla",
  description: "bayrak-ayarla",
  usage: "bayrak-ayarla",
  kategori: "Profil"
};
