const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Truva - Mute Sistemi`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}mute (id) <1s|1m|1h|1d> sebep** : id sini girdiğiniz kişiyi mutelersiniz  (bot otomatik olarak rol ve kanal izinlerini ayarlıyor) 
<:yrdm:893917171200176188> **${prefix}mute-yetkili @rol** : Yetkili Rolünü Ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}mute-yetkili-rol-sıfırla** : Yetkili Rol Sıfırlar.
<:yrdm:893917171200176188> **${prefix}mute-log #log** : Log Kanalını Ayarlarsınız.
<:yrdm:893917171200176188> **${prefix}log-sıfırla** : Mute Log Kanalını Sıfırlar. 
`)
  .addField(`:girdap: Linkler`,`
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
  name: 'mute-sistemi', 
}; 
