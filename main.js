// require Discord API
import { Client, Intents } from 'discord.js';
import request, { request2 } from './request.js';
import 'dotenv/config';


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
       msg.reply(`${data.summonerLevel},${data2.rank},${data2.leaguePoints}`)
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