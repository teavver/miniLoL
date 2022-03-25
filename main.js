// require Discord API
import { Channel, Client, Intents, MessageEmbed} from 'discord.js';
import {requestBasicData, requestSpecificData} from './request.js';
import 'dotenv/config';
import endReply from './embeds.js';

// changing space to space character in order to avoid spacing errors
const sp = ("%20");
// create client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

	if (commandName === 'user') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    // console.log(username)
		//const message = await interaction.reply({ content: username, fetchReply: true });
    const dataEun = await requestBasicData('eun1', username)
    const dataEuw = await requestBasicData('euw1', username)
    if (dataEun.status == true && dataEuw.status == true) {
      const message = await interaction.reply({content: 'Summoner name is taken on both EUW and EUNE servers, please specify the server by reacting :arrow_up: for EUNE and :arrow_left: for EUW', fetchReply: true})
     await message.react('⬆️').then(() => message.react('⬅️'))


      // emoji_w = client.get_Emoji(123456) ????????
      // message.react(emoji_w));

      const filter = (reaction, user) => {
        return ['⬆️', '⬅️'].includes(reaction.emoji.name) && user.id === interaction.user.id;
      }
      
      message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
      
          if (reaction.emoji.name === '⬆️') {
            reply(dataEun, 'eun1', message, username)
          } else {
            reply(dataEuw, 'euw1', message, username)
          }
        })
        .catch(collected => {
          message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
        });
    } 
    else if (dataEuw.status == true && dataEun.status == false) {
      reply(dataEuw, 'euw1', interaction, username)
    } else if (dataEun.status == true && dataEuw.status == false) {
      reply(dataEun, 'eun1', interaction, username)
    }
    
  }
  if (commandName === 'euw') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEuw = await requestBasicData('euw1', username)
    if (dataEuw.status == true) {
      reply(dataEuw, 'euw1', interaction, username)
    } else {
      message.reply('(euw) Summoner not found')
    }
  }
  if (commandName === 'eune') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEun = await requestBasicData('eun1', username)
    if (dataEun.status == true) {
      reply(dataEun, 'eun1', interaction, username)
    } else {
      message.reply('(eune) Summoner not found')
    }
  }
});
// tier images

const tierImgArr = {
  IRON: 'https://i.imgur.com/M3Rr4vi.png',
  BRONZE: 'https://i.imgur.com/ONXlyi7.png',
  SILVER: 'https://i.imgur.com/aR711ex.png',
  // gold new
  GOLD: 'https://i.imgur.com/jCSh4Xg.png',
  PLATINUM: 'https://i.imgur.com/JWK6J0o.png',
  DIAMOND: 'https://i.imgur.com/56SmgT3.png ',
  MASTER: 'https://i.imgur.com/IGTUePR.png',
  // gm new
  GRANDMASTER: 'https://i.imgur.com/iJnRUKm.png',
  CHALLENGER: 'https://i.imgur.com/Tcj6YJH.png'
}
// reply function

async function reply(_data, _server, interaction, _username) {
   const serverText = (_server==='eun1') ? 'eune':'euw'
  //  console.log(serverText)
   const dataSpec = await requestSpecificData(_server,_data.id)
   let reaction
   if (dataSpec.status === false) {
    reaction = ''
   }else{
    // reaction = await interaction.guild.emojis.cache.find(emoji => emoji.name === dataSpec.tier.toLowerCase());
    
  }
  const shortwr = (dataSpec.wins/(dataSpec.wins+dataSpec.losses)*100).toFixed(0)
  const reply = endReply(_data,dataSpec,_username,shortwr,serverText, tierImgArr[dataSpec.tier])
  interaction.reply({ embeds: [reply] })
 }


// const botToken = process.env.TOKEN
client.login(process.env.TOKEN)
// replaceAll function for replacing spaces with %20
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

