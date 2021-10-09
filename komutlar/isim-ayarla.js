const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../utils/errors.js");

exports.run = async (client, message, args) => {

let isim = args.slice(0).join(" ");
if (!isim)

return message.channel.send(
 "**Ripper Bot**\n\n ・**Lütfen isim belirtin.** \n **Örnek:** **r!isim-ayarla** `(İsim)` \n ・`**Tüm komutlara erişmek için -> r!yardım**  \n\n**Ripper Bot**"
    );
db.set(`Ripper Botİsim_${message.author.id}`, isim)
return message.channel.send(
    "**Ripper Bot**\n**------------------------------------**\n**• Profil isminiz başarıyla ayarlandı.** \n**• Belirtilen İsim ->** `" +
    isim +
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
  name: "isim-ayarla",
  description: "isim-ayarla",
  usage: "isim-ayarla",
  kategori: "Profil"
};
