import 'dotenv/config';
import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
const guildId = '956465175878316032'
const clientId = '956462698361671750'

const commands = [
	new SlashCommandBuilder().setName('user').setDescription('returns summoner info').addStringOption(option => option.setName('summoner').setDescription('summoner name')),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);