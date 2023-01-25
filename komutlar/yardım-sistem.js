const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Truva - Sistem Menüsü`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}sayaç-sistemi** : Sayaç Komutlarını Listelersiniz
<:yrdm:893917171200176188> **${prefix}koruma-sistemi** : Koruma Komutlarını Listelersiniz
<:yrdm:893917171200176188> **${prefix}kayıt-sistemi** : Kayıt Komutlarını Listelersiniz
<:yrdm:893917171200176188> **${prefix}mute-sistemi** : Mute Komutlarını Listelersiniz
<:yrdm:893917171200176188> **${prefix}jail-sistemi** : jail Komutlarını Listelersiniz
<:yrdm:893917171200176188> **${prefix}botlist-sistemi** : Botlist Komutlarını Listelersiniz.
`)
  .addField(` Linkler`,`
[Destek Sunucu'm](https://discord.gg/J23mKRDG7q) **|** [Davet Link'im](https://discord.com/oauth2/authorize?client_id=905164871165947914&scope=bot&permissions=27648860222) **|** [Oy]()
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
  permLevel: 0 };

exports.help = { 
  name: 'sistem', 
};