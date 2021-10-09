const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('${client.user.id}') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "r!";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **Ripper Bot Abone Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **» <:Youtube:826079526785384519> ${prefix}abone-yetkili-rol**  Abone Yetkilisini Ayarlısınız.
  **» <:Youtube:826079526785384519> ${prefix}abone-rol** Verilecek Abone Rolünü Ayarlarsınız.
  **» <:Youtube:826079526785384519> ${prefix}abone-log**  Abone Verildi Diye Gidecek Mesaj Logunu Ayarlarsınız.
  **» <:Youtube:826079526785384519> ${prefix}abone**  Etiketlediğiniz Kişiye Ayarladığınız Abone Rolünü Verir.
`)
        .setImage(`https://media.discordapp.net/attachments/860203436779634729/869862559602327572/standard_5.gif`)
        .addField(`» Ripper Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/ripper) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.lineReply(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['aboneyardım'],
  permLevel: 0,
};

exports.help = {
  name: 'abonemenü',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};