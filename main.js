// Last update: discord.js v14
import 'dotenv/config';
import commands from './commands.js';
import pkg from 'discord.js'
import pkg2 from 'discord-api-types/v10';
const { Client } = pkg;
const { GatewayIntentBits } = pkg2
const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions
  ],
  allowedMentions: {
    parse: ["everyone","roles", "users"],
  },
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.login(process.env.TOKEN)

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
  commands(interaction)
});

client.on('messageReactionAdd', (reaction, user) => {
  const message = reaction.message;
  if (user.bot) return
  if (reaction.emoji.name == '📖') {
    reaction.message.delete();
  }
})