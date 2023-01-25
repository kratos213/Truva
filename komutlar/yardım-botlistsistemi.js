const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`z - Botlist Sistemi`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}başvuru-kanal #kanal** : Başvuru Kanalını Ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}başvuru-liste** : Başvuruları Listeler.
<:yrdm:893917171200176188> **${prefix}bot-log #kanal** : Bot Log kanalını Ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}developer-rol @devrol** : Developer Rolünü Ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}bot-ekle (id) (prefix)** : Botunuzu Eklersiniz.
<:yrdm:893917171200176188> **${prefix}kontrol-et** : Onaylı ve Ekli Olmayanlar Botlar vb. kontrol eder.
<:yrdm:893917171200176188> **${prefix}mod-rol @mod-rol** : Mod Rolünü Ayarlarsınız
<:yrdm:893917171200176188> **${prefix}onay-red-log #log** : Onay-Red Log Kanalını Ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}onayla (botid)** : Botu Onaylarsınız.
<:yrdm:893917171200176188> **${prefix}reddet (botid) (sebep)** : Botu reddedersiniz.
<:yrdm:893917171200176188> **${prefix}bot-sil (id)** : Kimliğini Girdiğiniz Botu Sistemden Silersiniz.
<:yrdm:893917171200176188> **${prefix}bot-profil (id)** : Kimliğini Girdiğiniz Botun Profini atar.
<:yrdm:893917171200176188> **${prefix}tablo ** : Onaylama Reddetme Vb. İle İlgili Tablo Atar.
<:yrdm:893917171200176188> **${prefix}bot-sistem-sıfırla ** : Sistemi Sıfırlar.
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
  name: 'botlist-sistemi', 
};