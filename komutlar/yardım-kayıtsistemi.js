const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Truva - Kayıt Sistemi`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}alınacak-rol @rol** : Kayıt edilen kişiden alınacak rolü ayarlar.
<:yrdm:893917171200176188> **${prefix}alınacak-rol sıfırla** : Kayıt edilen kişiden alınacak rolü sıfırlar.
<:yrdm:893917171200176188> **${prefix}kayıt-kanal #kanal** : Kayıtın yapılacağı kanalı belirlersiniz.
<:yrdm:893917171200176188> **${prefix}kayıt-kanal sıfırla** : Kayıtın yapılacağı kanalı sıfırlarsınız.
<:yrdm:893917171200176188> **${prefix}kayıt-hg #kanal** : Kayıt hoş geldin kanalını ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}kayıt-hg sıfırla** : Kayıt hoş geldin kanalını sıfırlarsınız.
<:yrdm:893917171200176188> **${prefix}kayıt-yetkili @rol** : Kayıt edebilecek yetkiyi ayarlar.
<:yrdm:893917171200176188> **${prefix}kayıt-yetkili sıfırla** : Kayıt edebilecek yetkiyi sıfırlar.
<:yrdm:893917171200176188> **${prefix}erkek-rol @rol** : Kayıt edilince verilecek erkek rolü ayarlar.
<:yrdm:893917171200176188> **${prefix}erkek-rol sıfırla** : Kayıt edilince verilecek erkek rolünü sıfırlar.
<:yrdm:893917171200176188> **${prefix}kız-rol @rol** : Kayıt edilince verilecek kız rolü ayarlar.
<:yrdm:893917171200176188> **${prefix}kız-rol sıfırla** : Kayıt edilince verilecek kız rolünü sıfırlar.
<:yrdm:893917171200176188> **${prefix}erkek @kullanıcı isim yaş** : Erkekleri kayıt etmeye yarar.
<:yrdm:893917171200176188> **${prefix}kız @kullanıcı isim yaş** : Kızları kayıt etmeye yarar.
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
  permLevel: 0
};

exports.help = { 
  name: 'kayıt-sistemi', 
};