const AsreaperDiscord = require('discord.js');
const AsreaperClient = new AsreaperDiscord.Client();
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix

exports.run = (client, message) => {
 const AsreaperEmbed = new AsreaperDiscord.MessageEmbed()
  .setColor(0x36393F)
 .setAuthor(`${client.user.username} | Kullanıcı Yardım Menüsü`)
 .setDescription(`
 **r!davet** \n-> Botu davet edersiniz.
 **r!shardbilgi** \n-> Botun shard bilgilerini gösterir.
 **r!avatar** \n-> Etiketlediğiniz kişinin avatarını gösterir.
 **r!randompp** \n-> Botun ekli olduğu sunuculardaki her hangi birinin avatarını atar.
 **r!öneri** \n-> Bota öneri belirtirsiniz.
 **r!istatistik** \n-> Botun istatistiğini gösterir.
 **r!sonmesaj** \n-> Yazdığınız son mesajı gösterir.
 **r!tokat** \n-> Etiket Attığınız Kişiye Tokat Atar.
 **r!tokat-at** \n-> Etiket Attığınız Kişiye Tokat Atar v2.
 **r!fbi** \n-> FBI Gif 'i Atar.
`)
 .setTimestamp()
 message.lineReply(AsreaperEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'kullanıcı',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};