// require Discord API
import { Client, Intents } from 'discord.js';
import request, { request2 } from './request.js';
import 'dotenv/config';
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
// $help command
client.on("messageCreate", msg => {
  if (msg.content === "$help") {
    msg.reply("Type \`$help-all\` to see help for all commands. Type \`$help command-name\` To get more information about a specific command.")
  }
  // $user command
  if(msg.content.includes('$user')) {
    const username = replaceAll(msg.content.slice(6), " ","%20")
     req()
      async function req() {
       const data = await request('eun1', username)
       const data2 = await request2('eun1', data.id)
       let wr = data2.wins/(data2.wins+data2.losses)*100
       let shortwr = wr.toFixed(0)
       // w msg reply w miejscu ${username} potrzebny jest `slice()` w drugą strone zeby ucinało '$user' ale żeby też nie zwracało spacji w '%20' 
       msg.reply(`Information about summoner ${data2.summonerName}:\n\`Summoner level: ${data.summonerLevel}\`\n\`Tier: ${data2.tier} ${data2.rank}\`\n\`Wins: ${data2.wins}, Losses: ${data2.losses}\`\n\`Winrate: ${shortwr}%\``)
      }
    }
})

// user input -> summoner v4 -> match v4 -> fetch data from riot API -> save it in  json 
// read json and display in discord (5 last games and summoner info like rank, lvl, etc) -> ui interface

const botToken = process.env.TOKEN
client.login(process.env.TOKEN)

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}