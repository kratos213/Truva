const { MessageEmbed }  = require('discord.js');
const  ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {

  let prefix = ayarlar.prefix
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setAuthor(`Truva - Kullanıcı Menüsü`,message.author.avatarURL({dynamic:true}))
  .setDescription(`
<:yrdm:893917171200176188> **${prefix}avatar** : Profil Fotoğrafınızı Görüntülersiniz
<:yrdm:893917171200176188> **${prefix}say** : Yazarak Sunucu Hakkında Bilgi Edine Bilirsiniz
<:yrdm:893917171200176188> **${prefix}istatistik** : Truva Botumuzun İstatistiklerine Ulaşırsınız
<:yrdm:893917171200176188> **${prefix}afk (sebep)** : AFK olursunuz
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
  name: 'kullanıcı',
};