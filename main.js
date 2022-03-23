// require Discord API
import { Channel, Client, Intents, MessageEmbed} from 'discord.js';
import {requestBasicData, requestSpecificData} from './request.js';
import 'dotenv/config';
import helpEmbed from './embeds.js'
import endReply from './embeds.js';
// import './embeds.js';
// message embed utility
// const { MessageEmbed } = require('discord.js')


// changing space to space character in order to avoid spacing errors
const sp = ("%20");
// create client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });
//
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

	if (commandName === 'user') {
		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
    message.react('😹')
    console.log(options.getString('summoner'))
	}
});
// /user {nazwa} -> enter -> zwroci sprecyzuj serwer
// /user {nazwa} {serwer} -> zwraca info o typie

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return;

//   const {commandName} = interaction;

//   if (commandName === 'user')
//   // /user command
//   {
//     const username = replaceAll(msg.content.slice(6), " ","%20")
//     const dataEun = await requestBasicData('eun1', username)
//     const dataEuw = await requestBasicData('euw1', username)
//     //if (dataEun.status == true && dataEuw.status == true) {
//       const message = await interaction.reply({content: 'Summoner name is taken on both EUW and EUNE servers, please specify the server', fetchReply: true})
//       message.react('😄');
//     //}
//     if (dataEun.status == true && dataEuw.status == false) {
//       const message = await interaction.reply({content: reply(dataEun, 'eun1', interaction, username)})
//       message.react('😄');
//    }
//     if (dataEun.status == false && dataEuw.status == true) {
//       const message = await interaction.reply({content: reply(dataEuw, 'euw1', interaction, username)})
//       message.react('😄');
//     }
//     if (dataEun.status == false && dataEuw.status == false) {
//       const message = await interaction.reply({content: `Summoner not found`})
//       message.react('😄');
//      }

//    }
//  })


 client.on("messageCreate", msg => {
   // $user command
   if(msg.content.includes('$user')) {
     const username = replaceAll(msg.content.slice(6), " ","%20")
      req()
       async function req() {
        const dataEun = await requestBasicData('eun1', username)
        const dataEuw = await requestBasicData('euw1', username)
        if (dataEun.status == true && dataEuw.status == true) {
          msg.reply(`Summoner name is taken on both EUW and EUNE servers, please specify the server`)
        }
        if (dataEun.status == true && dataEuw.status == false) {
         reply(dataEun, 'eun1', msg, username)
       }
        if (dataEun.status == false && dataEuw.status == true) {
          reply(dataEuw, 'euw1', msg, username)
        }
        if (dataEun.status == false && dataEuw.status == false) {
          msg.reply(`Summoner not found`)
        }

       //  if (data.status) {
       //   console.log(data2.wins,data2.losses,wr,shortwr)
       //  } else {
       //    msg.reply(`Summoner not found in the database`)
       //  }
       } 
     }
     if(msg.content.includes('$euw')) {
       const username = replaceAll(msg.content.slice(5), " ","%20")
       req()
        async function req() {
        const dataEuw = await requestBasicData('euw1', username)
        if (dataEuw.status == true) {
          reply(dataEuw, 'euw1', msg, username)
        }
       }
     }
     if(msg.content.includes('$eune')) {
       const username = replaceAll(msg.content.slice(6), " ","%20")
       req()
       async function req() {
       const dataEun = await requestBasicData('eun1', username)
       if (dataEun.status == true) {
         reply(dataEun, 'eun1', msg, username)
       }
     }  
    }
 })

 async function reply(_data, _server, interaction, _username) {
   const serverText = (_server==='eun1') ? 'eune':'euw'
   console.log(serverText)
   const dataSpec = await requestSpecificData(_server,_data.id)
   const shortwr = (dataSpec.wins/(dataSpec.wins+dataSpec.losses)*100).toFixed(0)
   const reply = endReply(_data,dataSpec,_username,shortwr,serverText)
   interaction.reply({ embeds: [reply] })
 }


const botToken = process.env.TOKEN
client.login(process.env.TOKEN)

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

