import reply from "./reply.js";
import {requestBasicData, requestSpecificData, requestMmrData} from './request.js';
import { helpReply , notFound } from "./embeds.js";

export default async function commands(interaction){
  const { commandName, options } = interaction;

  //USER COMMAND
	if (commandName === 'user') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEun = await requestBasicData('eun1', username)
    const mmrEun = await requestMmrData('eune', username)
    const dataEuw = await requestBasicData('euw1', username)
    const mmrEuw = await requestMmrData('euw', username)

  // BOTH SERVERS CASE
    if (dataEun.status == true && dataEuw.status == true) {
      const message = await interaction.reply({content: 'Summoner name is taken on both EUW and EUNE servers, please specify the server by reacting 🇳 for EUNE and 🇼 for EUW', fetchReply: true})
     await message.react('🇳').then(() => message.react('🇼'))

      const filter = (reaction, user) => {
        return ['🇳', '🇼'].includes(reaction.emoji.name) && user.id === interaction.user.id;
      }
      
      message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
      
          if (reaction.emoji.name === '🇳') {
            reply(dataEun, 'eun1', message, username, mmrEun)
          } else {
            reply(dataEuw, 'euw1', message, username, mmrEuw)
          }
        })
        .catch(collected => {
          message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
        });
    } 
    else if (dataEuw.status == true && dataEun.status == false) {
      const mmrEuw = await requestMmrData('euw', username)
      reply(dataEuw, 'euw1', interaction, username, mmrEuw)
    } else if (dataEun.status == true && dataEuw.status == false) {
      const mmrEun = await requestMmrData('eune', username)
      reply(dataEun, 'eun1', interaction, username, mmrEun)
    }
    else if (dataEuw.status == false && dataEun.status == false) {
      interaction.reply({ embeds: [notFound('EUNE & EUW', options.getString('summoner'))], fetchReply: true})
    }
  }

  //EUW COMMAND
  if (commandName === 'euw') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEuw = await requestBasicData('euw1', username)
    const mmrEuw = await requestMmrData('euw', username)
    if (dataEuw.status == true) {
      reply(dataEuw, 'euw1', interaction, username, mmrEuw)
    } else {
      interaction.reply({ embeds: [notFound('EUW', options.getString('summoner'))], fetchReply: true})
    }
  }


  //EUNE COMMAND
  if (commandName === 'eune') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEun = await requestBasicData('eun1', username)
    const mmrEun = await requestMmrData('eune', username)
    if (dataEun.status == true) {
      reply(dataEun, 'eun1', interaction, username, mmrEun)
    } else {
      interaction.reply({ embeds: [notFound('EUNE', options.getString('summoner'))], fetchReply: true})
    }
  }

  //HELP COMMAND WITH REACTION
  if (commandName === 'help') {
    const message = await interaction.reply({ embeds: [helpReply()], fetchReply: true})
      await message.react('📖')
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}