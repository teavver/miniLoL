// require Discord API
const { Client, Intents } = require('discord.js');
// require fetch API
// const fetch = require("node-fetch");
// changing space to space character in order to avoid spacing errors
const sp = ("%20");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content === "help") {
    msg.reply("Type \`$help\` to see help for all commands. Type \`$help command-name\` To get more information about a specific command.")
  }
})

client.on("message", msg => {
  if (msg.content === "$tutorial") {
    msg.reply("Here's a brief tutorial on how to use the bot: \n Every command begins with a `$` sign. \n If you want to look up a summoner, simply type in the summoner's nickname after the `$` sign. \n Example: `$Riot Phlox`")
  }
})



const botToken = process.env['TOKEN']
client.login(process.env.TOKEN)

