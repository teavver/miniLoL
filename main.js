// require Discord API
import { Client, Intents } from 'discord.js';
import request from './request.js';
import 'dotenv/config';


// changing space to space character in order to avoid spacing errors
const sp = ("%20");
// create client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// riotKey
const riotKey = ''
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// help command w/o dollar sign
client.on("messageCreate", msg => {
  if (msg.content === "$help") {
    msg.reply("Type \`$help\` to see help for all commands. Type \`$help command-name\` To get more information about a specific command.")
  }
  if(msg.content.includes('$user')) {
    const username = msg.content.slice(6).replace(' ', "%20")
    // msg.reply(username)
    request('eun1', username).then(data => {
        msg.reply(data.summonerLevel.toString())
    })

    // (async () => {
    //   const data = await request('eun1','l9%20itachi')
    //   msg.reply(data.summonerLevel.toString())
    // })()
  }

})

// user input -> summoner v4 -> match v4 -> fetch data from riot API -> save it in  json 
// read json and display in discord (5 last games and summoner info like rank, lvl, etc) -> ui interface

const botToken = process.env.TOKEN
client.login(process.env.TOKEN)

