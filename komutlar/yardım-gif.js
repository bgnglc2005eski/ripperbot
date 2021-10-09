const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('798574936988844033') 

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "r!";  
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`**Ripper Bot  Gif Menüsüne Hoşgeldiniz** `)
        .setDescription(`
 
        ** <a:RainbowOk:826079335302823956> ${prefix}gif-ara** Yazdığınız Kelime Hakkında Gif Aratır!
        ** <a:RainbowOk:826079335302823956> ${prefix}man-gif** Rastgele Erkek Gifi Atar!
        ** <a:RainbowOk:826079335302823956> ${prefix}woman-gif** Rastgele Kadın Gifi Atar!
        ** <a:RainbowOk:826079335302823956> ${prefix}couple-gif** Rastgele Sevgili Gifi Atar!
        ** <a:RainbowOk:826079335302823956> ${prefix}baby-gif** Rastgele Bebek Gifi Atar!
        ** <a:RainbowOk:826079335302823956> ${prefix}animal-gif** Rastgele Hayvan Gifi Atar!
        ** <a:RainbowOk:826079335302823956> ${prefix}marvel-gif** Rastgele Marvel Gifi Atar!
`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .addField(`» Ripper Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/ripper) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Gif-menü', "yardımgif", "gifyardım", "yardım-gif", "gif-yardım"],
  permLevel: 0,
};

exports.help = {
  name: 'gif-menü',
  description: 'a!davet-sistemi Menüsü',
  usage: 'gif-menü'
};