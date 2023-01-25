const Discord = require('discord.js');
const db = require("quick.db");

exports.run = async (client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "?"; 
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
  .setTitle(`**Yetki Hatası**`)
  .setColor('#f8f8f9')
  .setThumbnail(message.author.avatarURL())
  .setDescription(`**•** \`${prefix}log-sıfırla\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)).then(a => a.delete({timeout: 10000}));

  db.delete(`mute.log.${message.guild.id}`);
  message.channel.send(new Discord.MessageEmbed()
  .setAuthor("Truva",client.user.avatarURL())
  .setColor("#f8f8f9")
  .setDescription(`**<:yrdm:893917171200176188> | Mute log başarıyla sıfırlandı**`)
  .setFooter("Tüm Hakları Saklıdır."))

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'log-sıfırla',
   cooldown: 5  
};