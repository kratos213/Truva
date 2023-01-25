const Discord = require('discord.js');

exports.run = async(client, message) => {
      if (message.author.id !== "765535065793888321") return message.channel.send(new Discord.MessageEmbed().setDescription("Üzgünüm sahibim sen değilsin")).then(m => m.delete({timeout: 5000}));
      let addrole = "813681481817653248";
      let removerole = "rol ıd"
      let usize = message.mentions.users.array().length;
      let u = message.mentions.users.array();
      for(let i=0; i < usize; i++){
        let gu = message.guild.members.cache.find(r => r.id == u[i].id)
        gu.roles.add(addrole);
        gu.roles.remove(removerole);
      }
      //console.log(usize + " USERS\n" + u)
              
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'rolveraga',
    description: '',
    usage: 'giverole'
};