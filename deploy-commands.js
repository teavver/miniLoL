import 'dotenv/config';
import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import config from './config.js'

const commands = [
	new SlashCommandBuilder().setName('help').setDescription('how to use the bot').addStringOption(option => option.setName('help').setDescription('helping')),
	new SlashCommandBuilder().setName('user').setDescription('returns summoner info').addStringOption(option => option.setName('summoner').setDescription('summoner name')),
	new SlashCommandBuilder().setName('euw').setDescription('returns euw summoner').addStringOption(option => option.setName('summoner').setDescription('summoner name')),
	new SlashCommandBuilder().setName('eune').setDescription('returns eune summoner').addStringOption(option => option.setName('summoner').setDescription('summoner name'))
]
	.map(commands => commands.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

// GLOBAL

// (async ()=> {
// 	try {
// 		await rest.put(Routes.applicationCommands(config.clientId), { body: commands })
// 		console.log('Deploying...')
// 	}
// 	catch(err){
// 		console.log(err)
// 	}
	
// })()


// DEVELOPMENT
rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

