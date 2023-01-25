const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Truva - Moderasyon Menüsü`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}ban** : Etiketlediğiniz Kullanıcıyı Sunucudan Yasaklarsınız
<:yrdm:893917171200176188> **${prefix}ban-yetkili-rol** : Ban Yetkili Rol Ayarlasınız
<:yrdm:893917171200176188> **${prefix}ban-liste** : Sunucunuzdaki Banları sayar
<:yrdm:893917171200176188> **${prefix}ban-log #logkanalı** : Ban Log Kanalını Ayarlarsınız
<:yrdm:893917171200176188> **${prefix}unban (ID)** : İdsini Girdiğiniz Kullanıcının Sunucudaki Yasaklamasını Kaldırırsınız
<:yrdm:893917171200176188> **${prefix}kick** : Etiketlediğiniz Kullanıcıyı Sunucudan Atarsınız
<:yrdm:893917171200176188> **${prefix}kick-yetkili-rol** : Kick Yetkili Rol Ayarlasınız
<:yrdm:893917171200176188> **${prefix}kick-log #logkanalı** : kick Log Kanalını Ayarlarsınız
<:yrdm:893917171200176188> **${prefix}takma-ad @Kullanıcı <yeni isim>** :  Etiketlediğiniz Kullanıcının Kullanıcı Adını Ayarlarsınız
<:yrdm:893917171200176188> **${prefix}küfür-engel <aç/kapat>** :   Küfür engeli açıp kapatırsınız
<:yrdm:893917171200176188> **${prefix}reklam-engel <aç/kapat>** :  Reklam engeli açıp kapatırsınız
<:yrdm:893917171200176188> **${prefix}reklam-kick <aç/kapat>** :  Reklam kick açıp kapatırsınız
<:yrdm:893917171200176188> **${prefix}slow-mode** :  Yavaş Modu Ayarlarsınız
<:yrdm:893917171200176188> **${prefix}sil** :   Belirtdiğiniz Sayıda Mesaj Siler
<:yrdm:893917171200176188> **${prefix}sa-as <aç/kapat>** : Otomatik Selamlaşmayı Açıp Kapatırsınız
<:yrdm:893917171200176188> **${prefix}otorol-ayarla @rol #logkanalı** : Sunucuya Yeni Gelecek Kişilere Verilecek Rolü Ayarlarsınız
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
  name: 'moderasyon', 
};
