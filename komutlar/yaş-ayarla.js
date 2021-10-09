const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../utils/errors.js");

exports.run = async (client, message, args) => {

  let yas = args.slice(0).join(" ");
  if (!yas)

return message.channel.send(
 "**Ripper Bot** \n\n ・**Lütfen yaş belirtin.** \n :・**Örnek:** **r!yaş-ayarla** `(Yaş)` \n・`**Tüm komutlara erişmek için -> r!yardım** \n\n**Ripper Bot**"
    );
db.set(`Ripper BotYas_${message.author.id}`, yas)
return message.channel.send(
    " **Ripper Bot** \n**------------------------------------**\n**• Yaş başarıyla ayarlandı. ** \n**• Belirtilen Yaş ->** " +
      yas +
      "` \n`• r!yardım` **Yazarak tüm komutlara erişebilirsiniz.** \n **------------------------------------**\n**Ripper Bot**"
      );
;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "Profil"
};
 
exports.help = {
  name: "yaş-ayarla",
  description: "",
  usage: "",
  kategori: "Profil"
};
