
const discord = require('discord.js');
exports.run = async(client, message, args, msg) => {
    const embed = new discord.MessageEmbed()
    .setAuthor(`Ripper Bot Yardım Menüsü`, client.user.avatarURL())
	.setColor("YELLOW")
	.setDescription(` 🔱 **Dil:** <a:turkey:842807781185683526>\n🛠️ **Prefix:** r!\n🏓 **Ping:** ${client.ws.ping}\n🔐 **Toplam Komut:** ${client.commands.size}`)
    .addField('**__r!kullanıcı__**', 'Kullanıcı Yardım Menüsünü Gösterir.', true)
    .addField('**__r!moderasyon__**', 'Moderasyon yardım menüsünü gösterir.', true)
    .addField('**__r!kayıtsistemi__**', 'Kayıt sistemi yardım menüsünü gösterir.', true)
    .addField('**__r!korumasistemi__**', 'Koruma sistemi yardım menüsünü gösterir.', true)
    .addField('**__r!logosistemi__**', 'Logo sistemi yardım menüsünü gösterir.', true)
    .addField('**__r!çekilişsistemi__**', 'Çekiliş sistemi yardım menüsünü gösterir.', true)
    .addField('**__r!profilsistemi__**', 'Profil sistemi yardım menüsünü gösterir.', true)
    .addField('**__r!ekonomisistemi__**', 'Ekonomi sistemi yardım menüsünü', true)
	.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
	.setFooter(`${message.author.username} komutu kullandı.`, message.author.displayAvatarURL({dynamic: true}))

message.lineReply(embed)
};
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ['help']



};
exports.help = {
name: "yardım"
};