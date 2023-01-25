const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "?";  

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed()
  .setTitle(`**Yetki Hatası**`)
  .setColor('#f8f8f9')
  .setThumbnail(message.author.avatarURL())
  .setDescription(`**•** \`${prefix}dev-rol\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)).then(a => a.delete({timeout: 10000}));
   
    if(!message.mentions.roles.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#f8f8f9').setTitle('Bir hata oldu!').setDescription('Bir rol etiketlemeyi unuttunuz.'));

let mentionRole = message.mentions.roles.first();
  db.set(`devRole.${message.guild.id}`, mentionRole.id);
 message.channel.send(new Discord.MessageEmbed()
  .setAuthor("Truva",client.user.avatarURL())
  .setColor("#f8f8f9")
  .setDescription(`**<:yrdm:893917171200176188> | Developer rol başarıyla ${mentionRole} olarak ayarlandı**`)
  .setFooter("Tüm Hakları Saklıdır."))
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['dev-rol'],
  permlevel: 0
}
exports.help = {
  name: 'developer-rol',
   cooldown: 5  
}