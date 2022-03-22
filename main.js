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
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
  // $user command
  if(msg.content.includes('$user')) {
    const username = replaceAll(msg.content.slice(6), " ","%20")
     req()
      async function req() {
       const dataEun = await requestBasicData('eun1', username)
       const dataEuw = await requestBasicData('euw1', username)
       console.log(dataEun, dataEuw)
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

async function reply(_data, _server, msg, _username) {
  const serverText = (_server==='eun1') ? 'eune':'euw'
  console.log(serverText)
  const dataSpec = await requestSpecificData(_server,_data.id)
  const shortwr = (dataSpec.wins/(dataSpec.wins+dataSpec.losses)*100).toFixed(0)
  const reply = endReply(_data,dataSpec,_username,shortwr,serverText)
  msg.reply({ embeds: [reply] })
}


const botToken = process.env.TOKEN
client.login(process.env.TOKEN)

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

