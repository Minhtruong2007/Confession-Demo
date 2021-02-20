const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const fs = require('fs');
const { TOKEN, CHANNELID } = require('./config.json');

const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".webm", ".mp4", ".mov"];
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var server = http.createServer(app);
const fetch = require('node-fetch');
const Discord = require("discord.js");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"

app.use(express.static('public'));

app.use(bodyParser.json());
//web app
	app.get('/', async (request, response) => {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.end(
			`      > Hello World 1 2 3 <
      > Confession In The Garden <
			-----------------------------------------------
			Powered By Hac  !!! 
			`
		);
	});
  const listener = server.listen(2022, function() {
	console.log(`Your app is listening on port ` + listener.address().port);
});
  //logs
client.on('ready', () => {
  console.log('-------------------------------');
  console.log(`${client.user.username} Da Online`);
  console.log('------------------------------');
  //STatus
  client.user.setPresence({ status: 'online' });
  const activities_list = [
   "",
  "(๑•̀ㅂ•́)ﻭ✧ 𝙏𝙝𝙚 𝙂𝙖𝙧𝙙𝙚𝙣 ✧ ",
  "(๑•̀ㅂ•́)ﻭ✧ Dms Riêng Để Confession ✧"
  ]
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
client.user.setActivity(activities_list[index])
  }, 5000);
});

//------------------------------

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.channel.type !== 'dm') return;
  if (message.content.length > 1024) return message.reply('**<a:starzzz:791321897458597939> | Confession Chỉ Được Gửi Dưới __1024__ Ký Tự. **');
  else {
    
    







    
    message.reply('<a:starzzz:791321897458597939> | Đã Gửi Confession Thành Công !');
    let count = JSON.parse(fs.readFileSync('./count.json')).count;
    count++;
    const cfsChannel = client.guilds.cache.get(`763763584731316235`).channels.cache.get(`773802705335484426`);
    const cfsChannels =client.guilds.cache.get(`763763584731316235`).channels.cache.get('764012277023768627');
    if (!cfsChannel) return;
    const embed = new MessageEmbed()
      .setTitle(`<a:thumb:794767273104900117>  Confession Số #${count} <a:thumb:794767273104900117>  `)
      .setColor(`#fdff00`)
      .setDescription(` ${message.content}`)
        .setFooter(client.user.username,client.user.displayAvatarURL() )
       .setTimestamp()
       
    const embed1 = new MessageEmbed()
          .setColor('#fdff00')
          .setAuthor("Confession Log", client.user.displayAvatarURL())
          .setDescription(`  ${message.content}`)
          .setTitle(`Confession #${count}`)
          .setFooter("Confession được gửi bởi: " + message.author.tag + " ", message.author.avatarURL)
          .setTimestamp()
    if (message.attachments.size > 0) {
      let attachment = message.attachments.first()
      picExt.forEach(async (ext)  => {
        if (attachment.name.endsWith(ext)) {
          embed.setImage(attachment.url);
           cfsChannel.send(embed)
          cfsChannels.send(embed1)
        }
      });
      videoExt.forEach(async (ext) => {
        if (attachment.name.endsWith(ext)) {
          cfsChannel.send(`**<a:thumb:794767273104900117>  Confession Số #${count} <a:thumb:794767273104900117> ** `, attachment);
          cfsChannels.send(embed1)
        }
      });
    } else { 
       cfsChannel.send(embed)
       cfsChannels.send(embed1)
       }
    fs.writeFile('./count.json', JSON.stringify({ count: count }), function(err) {
      if (err) console.log(err)
    })
  }

});


client.login(TOKEN)