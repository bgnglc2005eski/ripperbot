const db = require("quick.db");
const { Client, Message, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    const content = args.join(" ");
    if (!content) return message.lineReply("AFK kalmak için sebep gir!")
    db.set(`afk-${message.author.id}+${message.guild.id}`, content);
    if (message.guild.owner.id !== message.author.id) {
        message.member.setNickname(`[AFK] ${message.author.username}`)
    }
    const embed = new MessageEmbed()
      .setDescription(`Başarıyla AFK oldun!\n**Sebep :** ${content}`)
      .setColor("GREEN")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
    message.lineReply(embed);
}

exports.conf = {
aliases: []
}

exports.help = {
name: 'afk',
description: 'afk olursunuz',
usage: 'afk <sebep>'
}