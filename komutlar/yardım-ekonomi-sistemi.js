const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('798574936988844033') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "r!";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **Ripper Bot Ekonomi Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **<a:RainbowOk:826079335302823956> ${prefix}günlük**  \`24 saat aralıkla 2300-2700 arası para kazanırsınız.\`\n
  **<a:RainbowOk:826079335302823956> ${prefix}hafta**  \`7 gün aralıkla 9200-10800 arası para kazanırsınız.\` \n
  ** <a:RainbowOk:826079335302823956> ${prefix}para**  \`Etiketlediğiniz kişinin veya kendi paranızı görürsünüz.\`\n
  ** <a:RainbowOk:826079335302823956> ${prefix}gönder**  \`Etiketlediğiniz kullanıcıya para gönderirsiniz.\`\n
  ** <a:RainbowOk:826079335302823956> ${prefix}soygun**  \`14 dakikada bir soygun yaparsınız.\`\n
  ** <a:RainbowOk:826079335302823956> ${prefix}çalış**  \`Rastgele bir işte çalışıp maaş alırsınız.\`\n
  ** <a:RainbowOk:826079335302823956> ${prefix}yatır**  \`\Kendi cüzdanınızdan bankaya para yatırırsınız.\`\n
  ** <a:RainbowOk:826079335302823956> ${prefix}pçek**  \`Bankadan kendi cüzdanınıza para çekersiniz.\`\n
  ** <a:RainbowOk:826079335302823956> ${prefix}çal**  \`Etiketlediğiniz kişinin cüzdanından para çalarsınız.\`\n
`)
        .setImage(`https://media.discordapp.net/attachments/861203654173655058/870195920237633546/standard_1.gif`)
        .addField(`» Ripper Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/ripper) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekonomiyardım'],
  permLevel: 0,
};

exports.help = {
  name: 'ekonomisistemi',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};