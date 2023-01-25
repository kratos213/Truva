const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Truva - Koruma Sistemi`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}kanal-koruma #kanal** : Kanal koruma sistemini açar
<:yrdm:893917171200176188> **${prefix}kanal-koruma-sıfırla** : Kanal koruma sistemini sıfırlar
<:yrdm:893917171200176188> **${prefix}rol-koruma #kanal** : Rol koruma sistemini açar
<:yrdm:893917171200176188> **${prefix}rol-koruma-sıfırla** : Rol koruma sistemini sıfırlar
<:yrdm:893917171200176188> **${prefix}anti-raid aç** : Anti-raid sistemini açarsınız
<:yrdm:893917171200176188> **${prefix}bot-izni ver/kaldır (botid) ** : Botun sunucuya girmesine izin verirsiniz

`)
  .addField(` Linkler`,`
[Destek Sunucu'm](https://discord.gg/J23mKRDG7q) **|** [Davet Link'im](https://discord.com/oauth2/authorize?client_id=893900763372322877&scope=bot&permissions=805314622) **|** [Oy]()
`)
  .setThumbnail(message.author.avatarURL({dynamic:true}))
  .setImage('')
  .setFooter(`Truva`,client.user.avatarURL())
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'koruma-sistemi', 
};