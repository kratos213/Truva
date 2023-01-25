const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.cache.filter(
    c => c.type === "voice"
  );
  let count = 0;
  let botlar = message.guild.members.cache.filter(m => m.user.bot).size;
  let textChannels = message.guild.channels.cache.filter(m => m.type == "text")
    .size;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  let astrocode = message.guild.members.cache.filter(
    m => !m.user.bot && m.user.presence.status !== "offline"
  ).size;
  const astrocode2 = new Discord.MessageEmbed()
    .setColor("GOLD")
    .setThumbnail(`${message.guild.iconURL()}`)
    .addField(
      `**Sunucudaki Toplam Üye Sayısı**`,
      `**\`\`\`${message.guild.memberCount}\`\`\`**`
    )
    .addField(
      `**Toplam Çevrimiçi Üye Sayısı**`,
      `**\`\`\`${astrocode}\`\`\`**`
    )
    .addField(`**Seslideki Üye Sayısı**`, `**\`\`\`${count}\`\`\`**`)
    .addField(`**Yazı Kanalları**`, ` » **${textChannels}**`)
    .addField(
      `  **Ses Kanalları**`,
      `» ${
        message.guild.channels.cache.filter(chan => chan.type === "voice").size
      }`
    )
    .addField(`**Roller**`, `»  **${message.guild.roles.cache.size}**`)
    .addField(`**Emojiler**`, `»  **${message.guild.emojis.cache.size}**`)
    .addField(
      ` **👥Kullanıcılar**`,
      `💫Çevrimiçi : **${
        message.guild.members.cache.filter(o => o.presence.status === "online")
          .size
      }** \n ⛔Rahatsız Etmeyin : **${
        message.guild.members.cache.filter(dnd => dnd.presence.status === "dnd")
          .size
      }** \n 🏴Boşta: **${
        message.guild.members.cache.filter(i => i.presence.status === "idle")
          .size
      }** \n 🏳Görünmez/Çevrimdışı : **${
        message.guild.members.cache.filter(
          off => off.presence.status === "offline"
        ).size
      }** \n  🔮Botlar : **${botlar}**`,
      true
    )
    .setFooter(`${message.author.tag}`, client.user.avatarURL());
  message.channel.send(astrocode2);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Sunucudaki kişilerin ön izlenmesini atar.",
  usage: "say"
};