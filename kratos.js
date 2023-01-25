const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Az Önce Bot Ping yedi, Sorun önemli değil merak etme. Hatayı düzelttik.`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr");
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


//--------------------------------KOMUTLAR-------------------------------\\
client.on("message", async msg => {
  let saas = await db.fetch(`saas_${msg.guild.id}`);

  if (saas == "kapali") return;

  if (saas == "acik") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply(
        "<a:ayck:765868423480606732> Aleyküm Selam Hoşgeldin Canım. Bu Gün Nasılsın?"
      );
    }
  }
});


      ///`<a:751848218513506354:772703432783953920> 
      client.on("guildMemberAdd", async member => {
    var SKanal = await db.fetch(`SKanal_${member.guild.id}`)
    const hedef = await db.fetch(`hedef_${member.guild.id}`)

    if(!SKanal) return;

    const hedef2 = hedef - member.guild.memberCount

    client.channels.cache.get(SKanal).send(`<a:dnccvcv:768771375053144074> ${member} katıldı seninle beraber ${member.guild.memberCount} kişiyiz ${hedef} kişi olmamıza ${hedef2} kişi kaldı`)
})
client.on("guildMemberRemove", async member => {
    var SKanal = await db.fetch(`SKanal_${member.guild.id}`)
    const hedef = await db.fetch(`hedef_${member.guild.id}`)

    if(!SKanal) return;

    const hedef2 = hedef - member.guild.memberCount

    client.channels.cache.get(SKanal).send(`<a:751848218513506354:772703432783953920> ${member} ayrıldı  ${member.guild.memberCount} kişiyiz ${hedef} kişi olmamıza ${hedef2} kaldı`)
})
        

/////////Küfür Engel
client.on("message", async msg => {
  let a = await db.fetch(`kufur_${msg.guild.id}`);
  if (a == "acik") {
    const küfür = [
      "yarak",
      "mk",
      "amk",
      "aq",
      "orospu",
      "oruspu",
      "oç",
      "sikerim",
      "yarrak",
      "piç",
      "amq",
      "sik",
      "amcık",
      "çocu",
      "sex",
      "seks",
      "amına",
      "orospu çocuğu",
      "sg",
      "siktir git",
      "31",
      "ananın amına yarak"
    ];
    if (küfür.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();

          return msg.channel
            .send(`Küfür Etmemelisin !`)
            .then(msg => msg.delete(10000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!a) return;
});

//reklam
client.on("message", async message => {
  const lus = await db.fetch(`reklam_${message.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();

          return message
            .reply("Hey Dur! Bu Sunucuda Reklamı Engelliyorum")
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});
client.on("messageUpdate", async message => {
  const lus = await db.fetch(`reklam_${message.guild.id}`);
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();

          return message
            .reply("Hey Dur! Bu Sunucuda Reklamı Engelliyorum Pislik Seniii !")
            .then(message => message.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});

// ban rol kanal koruma

client.on("roleCreate", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor(0x36393f)
      .addField(`Açan:`, entry.executor.tag)
      .addField(`Açılan Rol:`, role.name)
      .addField(`Sonuç:`, `Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.delete();

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Açıldı!`)
      .setColor(0x36393f)
      .addField(`Rolu Açan:`, entry.executor.tag)
      .addField(`Açılan Rol:`, role.name)
      .addField(`Sonuç:`, `Açılan Rol Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelDelete", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Silen:`, entry.executor.tag)

      .addField(`Silinen Kanal:`, channel.name)
      .addField(`Sonuç:`, `Kanal Geri Açıldı!`)

      .setColor(0x36393f);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.guild.channels.create(channel.name, channel.type, [
      {
        id: channel.guild.id,
        position: channel.calculatedPosition
      }
    ]);

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Silindi!`)
      .addField(`Kanalı Silen:`, entry.executor.tag)
      .setColor(0x36393f)
      .addField(`Silinen Kanal:`, channel.name)
      .addField(`Sonuç:`, `Silinen Kanal Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("channelCreate", async channel => {
  let kontrol = await db.fetch(`dil_${channel.guild.id}`);
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor(0x36393f)
      .addField(`Açan:`, entry.executor.tag)
      .addField(`Açılan Kanal:`, channel.name)
      .addField(`Sonuç:`, `Kanal Geri Silindi!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == channel.guild.owner.id) return;
    channel.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Kanal Açıldı!`)
      .setColor(0x36393f)
      .addField(`Kanalı Açan:`, entry.executor.tag)
      .addField(`Açılan Kanal:`, channel.name)
      .addField(`Sonuç:`, `Açılan Kanal Geri Silindi.`);
    client.channels.cache.get(kanal).send(embed);
  }
});
// Ban ve Rol Koruma Devam
client.on("guildBanAdd", async (guild, user) => {
  let kontrol = await db.fetch(`dil_${guild.id}`);
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor(0x36393f)
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
      );
    client.channels.cache.get(kanal).send(embed);
  } else {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    guild.members.unban(user.id);
    guild.members.cache.get(entry.executor.id).kick();
    const embed = new Discord.MessageEmbed()
      .setTitle(`Biri Yasaklandı!`)
      .setColor(0x36393f)
      .addField(`Yasaklayan:`, entry.executor.tag)
      .addField(`Yasaklanan Kişi:`, user.name)
      .addField(
        `Sonuç:`,
        `Yasaklayan kişi sunucudan atıldı ve yasaklanan kişinin yasağı kalktı. `
      );
    client.channels.cache.get(kanal).send(embed);
  }
});
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  let rol = await db.fetch(`rolrol_${role.guild.id}`);
  let kontrol = await db.fetch(`dil_${role.guild.id}`);
  let kanal = await db.fetch(`rolk_${role.guild.id}`);
  if (!kanal) return;
  if (kontrol == "agayokaga") {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor(0x36393f)
      .addField(`Silen:`, entry.executor.tag)
      .addField(`Silinen Rol:`, role.name)
      .addField(`Sonuç:`, `Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  } else {
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == role.guild.owner.id) return;
    role.guild.roles
      .create({
        data: {
          name: role.name
        }
      })
      .then(r => r.setPosition(role.position));

    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir Rol Silindi!`)
      .setColor(0x36393f)
      .addField(`Silen:`, entry.executor.tag)
      .addField(`Silinen Rol:`, role.name)
      .addField(`Sonuç:`, `Silinen Rol Geri Açıldı!`);
    client.channels.cache.get(kanal).send(embed);
  }
});

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** <a:dikkatdikkat:765868468326498305>";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** <a:dnccvcv:768771375053144074>";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [
    "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif",
    "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif",
    "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif",
    "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif"
  ];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

    //
    .setDescription(
      `<a:hypesquad7:765868674078474272> **Hoş geldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n <a:dnccvcv:768771375053144074> Kaydının yapılması için **isim** ve **yaş** yazman gerek. \n <a:dikkatdikkat:765868468326498305> Hesap kuruluş tarihi: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
      )}** \n <a:ayar2:765868544633208853> Bu vatandaş: ${kontrol} \n <a:ynnsnnklp:765868471527145504> <@&${kayıtçı}> rolündeki yetkililer sizinle ilgilenecektir.`
    );
  //
  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`);
});

//kayıt kanal son //

//kayıt kanal son //

const bot = new Discord.Client();

var oyun = [
  `✨ Gelişmiş Komutlara Göz Atmak İçin | ?yardım`,
  `🚀 Gelişmiş Sistemler İçin | ?sistem`,
  `🔔 Bots Hizmetinizde`
  
];

client.on("ready", () => {
  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);
    client.user.setActivity(oyun[random], { type: "PLAYING" });
  }, 2 * 5000);
});

client.on("guildMemberAdd", member => {
  let rol = db.fetch(`otorol_${member.guild.id}`);
  let kanal = db.fetch(`otokanal_${member.guild.id}`);
  if (!kanal) return;
  if (!rol) return;
  let kanalbulundu = member.guild.channels.cache.get(kanal);
  let rolbulundu = member.guild.roles.cache.get(rol);
  if (!kanalbulundu)
    return console.log(`${member.guild.name} Sunucusunda kanalı bulamadım! `);
  if (!rolbulundu)
    return console.log(`${member.guild.name} Sunucusunda Rolü bulamadım! `);

  member.roles.add(rol);
  kanalbulundu.send(
    member.user.username +
      " Hoşgeldin " +
      rolbulundu.name +
      " Rolü Başarıyla verildi"
  ); // Yazıyı Kendinize göre ayarlayın
});

//afk//
client.on("message", async message => {
  const msg = message;
  if (message.content.startsWith(ayarlar.prefix + "afk")) return;
  /*db.set(`afkSebep_${message.author.id}_${message.guild.id}`, "Sebep Girilmemiş")
  db.set(`afkKisi_${message.author.id}_${message.guild.id}`, message.author.id)           
  db.set(`afkAd_${message.author.id}_${message.guild.id}`, message.author.username)*/

  let afk = message.mentions.users.first();

  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);

  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`);
  if (afk) {
    const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`);
    const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`);
    if (message.content.includes(kisi3)) {
      const embed = new Discord.MessageEmbed()
        .setColor("#0080FF")
        .setAuthor("", client.user.avatarURL())
        .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
        .setTimestamp()
        .setFooter(`${message.author.username} Tarafından İstendi`);
      message.channel.send(embed);
    }
  }
  if (message.author.id === kisi) {
    const embed = new Discord.MessageEmbed()
      .setColor("#0080FF")
      .setAuthor("", client.user.avatarURL())
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`);
    message.channel.send(embed);
    db.delete(`afkSebep_${message.author.id}_${message.guild.id}`);
    db.delete(`afkid_${message.author.id}_${message.guild.id}`);
    db.delete(`afkAd_${message.author.id}_${message.guild.id}`);
    message.member.setNickname(isim);
  }
});
client.on("message", async message => {
  const lus = await db.fetch(`reklamkick_${message.guild.id}`);
  let sayı = await db.fetch(`sayı_${message.author.id}`);
  let a = message.author;
  if (lus) {
    const reklamengel = [
      "discord.app",
      "discord.gg",
      ".party",
      ".com",
      ".az",
      ".net",
      ".io",
      ".gg",
      ".me",
      "https",
      "http",
      ".com.tr",
      ".org",
      ".tr",
      ".gl",
      "glicht.me/",
      ".rf.gd",
      ".biz",
      "www.",
      "www"
    ];
    if (
      reklamengel.some(word => message.content.toLowerCase().includes(word))
    ) {
      try {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
          message.delete();
          db.add(`sayı_${message.author.id}`, 1);
          if (sayı == null) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Bu İlk Uyarın Lütfen Tekrarlama!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(`Bu İlk Uyarın Lütfen Tekrarlama`);
            return;
          }
          if (sayı === 1) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Bu İkinci Uyarın Lütfen Tekrarlama!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(`Bu İkinci Uyarın Lütfen Tekrarlama`);
            return;
          }
          if (sayı > 2) {
            const sa = new Discord.MessageEmbed().setDescription(
              `Hey! <@${message.author.id}> Reklamdan Dolayı Kickledim!`
            );
            message.channel.send(sa);
            message.delete();
            a.send(
              `${message.guild.name} Sunucusundan Reklam Yaptığın İçin Kicklendin Piç`
            );
            db.delete(`sayı_${message.author.id}`);
            message.guild.member(a).kick();
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!lus) return;
});

//BOT ENGEL,anti-baskın yada anti-raid

client.on("guildMemberAdd", async member => {
  // Yapımı Tamamen CodAre'den '~'Resađ Seferov✨#0809 a aitdir

  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "?anti-raid aç";

  if (!kanal) return;

  var cod = member.guild.owner;

  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let are = new Discord.RichEmbed()

        .setColor("RANDOM")

        .setThumbnail(member.user.avatarURL)

        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır botun_id**.`
        );

      cod.send(are); //CodAre✨
    } else {
      let izinverilmemişbot = new Discord.RichEmbed()

        .setColor("RANDOM")

        .setThumbnail(member.user.avatarURL)

        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" +
            prefix +
            "bot-izni ver botun_id**"
        );

      member.ban(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın

      cod.send(izinverilmemişbot);
    }
  }
});

//deneme

async function RadioRepeater() {//hamzamertakbaba#3575

  let Channel = client.channels.cache.get("RADYO ÇALACAK KANAL ID");

  var streamURL = "http://fenomen.listenfenomen.com/fenomen/256/icecast.audio";

  if(!Channel) return;

   await Channel.leave();

   Channel.join().then(connection => {

    const dispatcher = connection.play(streamURL);

    dispatcher.setVolume(100/100) //Radyonun sesini ayarlarsınız. Değiştirmek isterseniz en soldakini değiştirin. Örnek olarak: dispatcher.setVolume(50/100)

});

};

client.on('ready', () => {//hamzamertakbaba#3575

  RadioRepeater()

  setInterval(RadioRepeater, Math.max(3600000))

  let Channel = client.channels.cache.get("RADYO ÇALACAK KANAL ID")

  if(!Channel) return;

    var streamURL = "http://fenomen.listenfenomen.com/fenomen/256/icecast.audio";

     

    

           Channel.join().then(connection => {

              const dispatcher = connection.play(streamURL);

              dispatcher.setVolume(100/100) //Radyonun sesini ayarlarsınız. Değiştirmek isterseniz en soldakini değiştirin. Örnek olarak: dispatcher.setVolume(50/100)

      

          });

  });
client.on('guildMemberRemove', async member => {
	member.guild.members.cache.filter(s => db.fetch(`serverData.${member.guild.id}.botsData.${s.id}`)).forEach(x => {
      let bot = db.fetch(`serverData.${member.guild.id}.botsData.${x.id}`);
	  if(bot){
	  if(bot.owner == member.id){
             member.guild.members.ban(x, {reason: "Sahibi Sunucudan Ayrıldı."})
	     db.set(`serverData.${member.guild.id}.botsData.${x.id}.status`, "Reddedildi")
	     db.set(`serverData.${member.guild.id}.botsData.${x.id}.redReason`, "Sahibi Sunucudan Ayrıldı.")
	  }
    }
  })
})
client.on("ready", async (message) => {

setInterval(() => {
 
let datalar = db.all().filter(data => data.ID.startsWith("mute_"))  

if(datalar.size < 0) return;

datalar.forEach(datacık => {

let kullanıcı = datacık.ID.replace("mute_", "")
let data = db.fetch(`mute_${kullanıcı}`)


let süre = data.ms - (Date.now() - data.başlangıç)

let sunucu = client.guilds.cache.get(data.sunucu)
if(!sunucu) return
let member = sunucu.members.cache.get(kullanıcı)
let kanal = sunucu.channels.cache.get(data.kanal)
let sebep = data.sebep
let moderator = client.users.cache.get(data.moderator)
let mute_rol = sunucu.roles.cache.find(rol => rol.name.toLowerCase().includes("susturuldu") || rol.name.toLowerCase().includes("muted"))


if(!member) {

  let hata = new Discord.MessageEmbed()
  .setTitle("Bots - Chat Mute Sistem")
  .setDescription(`
  <@${member.user.id}> isimli kullanıcının susturulması devam ettirelemdi!
​
Dikkat! **${member.user.id}** ID'sine sahip; **${moderator.tag}**
 tarafından susturulan kullanıcı sunucudan çıktığı için susturulması devam ettirelemedi!`)
  .setColor("#f8f8f9")
  kanal.send("<@!"+moderator.id+">", hata)
db.delete(datacık.ID)

return
} 

if(süre > 0) return

let bitti = new Discord.MessageEmbed()
.setTitle("Bots - Chat Mute Sistem")
.setDescription(`
<@${member.user.id}> isimli kullanıcının susturulma süresi doldu!
​
・Cezası biten kullanıcı → **<@${member.user.id}>**
・Ceza veren yetkili → **${moderator.id}**
・Ceza sebebi → **${sebep}**
・Ceza bitiş tarihi → **${moment(Date.now()).format(" LL (DD/MM/yyyy) HH:mm:ss")}**
`)
.setColor("#f8f8f9")
kanal.send("<@!"+member.user.id+">",bitti)




member.roles.remove(mute_rol)
db.delete(datacık.ID)
})
}, 5000);

})




