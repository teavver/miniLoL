// import modules
import { Channel, Client, Intents, MessageEmbed} from 'discord.js';
import 'dotenv/config';
import commands from './commands.js';


// create client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

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


// console.log(process.env.TOKEN)
client.login(process.env.TOKEN)


// client.ws.gateway(dsd)


