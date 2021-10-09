const Discord = require("discord.js");

exports.run = async (client, message) => {

  let embed = new Discord.MessageEmbed()

    .setColor("RANDOM") 

    .setTitle("Ripper Bot 'a OyVer!") 

   .setImage("https://media.discordapp.net/attachments/860203436779634729/870001101032787968/unknown.png")

  const fetch = require("node-fetch");

    const kanal = message.channel.id;

    const mesaj = embed

    const butonmesaj = "Oyver!"

    fetch(`https://discord.com/api/v9/channels/${kanal}/messages`, {

        method: "POST",

        body: JSON.stringify({"embed":mesaj,

            "components": 

            [

              {

                "type": 1,

                "components": [

                    {

                        "type": 2,

                        "label": butonmesaj,

                        "style": 5,

                        "url": "https://top.gg/bot/832231157189574676/vote"

                    }

]

            }

            ],

                             }),

        headers: {

            "Authorization": `Bot ${client.token}`,

            "Content-Type": "application/json"

        }

    })

};

exports.conf = {

  enabled: true,

  guildOnly: true,

  aliases: ["oyver", "oy-ver"],

  permLevel: 0

};

exports.help = {

  name: "oy",

  description: "Botun pingini gösterir",

  usage: "ping"

};