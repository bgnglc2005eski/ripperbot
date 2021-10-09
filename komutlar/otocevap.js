const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      `Aç yada kapat yazmalısın!! Örnek: **r!otocevap aç**`
    );
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(
      " Bu komutu kullanmak için `MESAJLARI_YÖNET` yetkisine sahip olmalısın!"
    );

  if (args[0] === "aç") {
    db.set(`otocvp_${message.guild.id}`, "acik");
    message.channel.send(
      `✅ **Artık bot Belirli mesajlara cevap verecek. Kapatmak için "\`r!otocevap kapat\`" yazmalısın.**`
    );
  }

  if (args[0] === "kapat") {
    db.set(`otocvp_${message.guild.id}`, "kapali");
    message.channel.send(
      `❌ **Artık bot belirli mesajlara cevap vermiyor :(**`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otocevap-sistemi"],
  permLevel: 0,
  kategori: "Ayarlar"
};

exports.help = {
  name: "otocevap",
  description: "Sa As ayarlarsın.",
  usage: "otocevap"
};
