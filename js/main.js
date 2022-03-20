// require Discord API
import { Client, Intents } from 'discord.js';
import request from './request';
// require fetch API
// const fetch = require("node-fetch");
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
client.on("message", async (msg) => {
  if (msg.content === "help") {
    msg.reply("Type \`$help\` to see help for all commands. Type \`$help command-name\` To get more information about a specific command.")
  }
  if(msg.content === "user") {
    const data = await request('eun1','l9%20itachi')
    msg.reply(data.summonerLevel)
  }
})
// help command w/ dollar sign
// client.on("message", msg => {
//     if (msg.content === "$help") {
//       msg.reply("Here's a list of all commands:")
//     }
//   })
// tutorial command
// client.on("message", msg => {
//   if (msg.content === "$tutorial") {
//     msg.reply("Here's a brief tutorial on how to use the bot: \n Every command begins with a `$` sign. \n If you want to look up a summoner, simply type in the summoner's nickname after the `$` sign. \n Example: `$Riot Phlox`")
//   }
// })

// user input -> summoner v4 -> match v4 -> fetch data from riot API -> save it in  json 
// read json and display in discord (5 last games and summoner info like rank, lvl, etc) -> ui interface

const botToken = process.env['TOKEN']
client.login(process.env.TOKEN)

