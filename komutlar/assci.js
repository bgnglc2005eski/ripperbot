const Discord = require('discord.js');
require('discord-reply');
var figlet = require('figlet');
exports.run = async(client, message, args) => {
 
        var maxLen = 10 // Karakter sayısını buradan değiştirebilirsiniz

        if(args.join(' ').length > maxLen) return message.channel.send(`You can type up to **10** characters.`)
      
        if(!args[0]) return message.channel.send('Please type something.');
      
        figlet(`${args.join(' ')}`, function(err, data) {
            if (err) {
                console.log('ERROR!!');
                console.dir(err);
                return;
            }
      
            message.lineReply(`${data}`, {code: 'AsciiArt'});
        });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bigtext'],
  permLevel: 0
};
 
exports.help = {
  name: 'ascii'
};