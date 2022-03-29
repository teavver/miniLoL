import reply from "./reply.js";
import tierImgArr from './tiers.js';

import {requestBasicData, requestSpecificData} from './request.js';


export default async function commands(interaction){
  const { commandName, options } = interaction;

  //USER COMMAND
	if (commandName === 'user') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    // console.log(username)
		//const message = await interaction.reply({ content: username, fetchReply: true });
    const dataEun = await requestBasicData('eun1', username)
    const dataEuw = await requestBasicData('euw1', username)
    if (dataEun.status == true && dataEuw.status == true) {
      const message = await interaction.reply({content: 'Summoner name is taken on both EUW and EUNE servers, please specify the server by reacting :arrow_up: for EUNE and :arrow_left: for EUW', fetchReply: true})
     await message.react('⬆️').then(() => message.react('⬅️'))

      const filter = (reaction, user) => {
        return ['⬆️', '⬅️'].includes(reaction.emoji.name) && user.id === interaction.user.id;
      }
      
      message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
      
          if (reaction.emoji.name === '⬆️') {
            reply(dataEun, 'eun1', message, username)
          } else {
            reply(dataEuw, 'euw1', message, username)
          }
        })
        .catch(collected => {
          message.reply('You reacted with neither a thumbs up, nor a thumbs down.');
        });
    } 
    else if (dataEuw.status == true && dataEun.status == false) {
      reply(dataEuw, 'euw1', interaction, username)
    } else if (dataEun.status == true && dataEuw.status == false) {
      reply(dataEun, 'eun1', interaction, username)
    }
    
  }

  //EUW COMMAND
  if (commandName === 'euw') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEuw = await requestBasicData('euw1', username)
    if (dataEuw.status == true) {
      reply(dataEuw, 'euw1', interaction, username)
    } else {
      message.reply('(euw) Summoner not found')
    }
  }


  //EUNE COMMAND
  if (commandName === 'eune') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEun = await requestBasicData('eun1', username)
    if (dataEun.status == true) {
      reply(dataEun, 'eun1', interaction, username)
    } else {
      message.reply('(eune) Summoner not found')
    }
  }
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}