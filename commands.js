import reply from "./reply.js";
import tierImgArr from './tiers.js';

import {requestBasicData, requestSpecificData} from './request.js';
import { helpReply } from "./embeds.js";
import { Embed } from "@discordjs/builders";


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
            reply(dataEun, 'eun1', interaction, username)
          } else {
            reply(dataEuw, 'euw1', interaction, username)
          }
        })
        .catch(collected => {
          message.reply("You didn't choose any server.");
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
      interaction.reply(`\`[EUW] Summoner ${username}not found\``)
    }
  }


  //EUNE COMMAND
  if (commandName === 'eune') {
    const username = replaceAll(options.getString('summoner')," ","%20")
    const dataEun = await requestBasicData('eun1', username)
    if (dataEun.status == true) {
      reply(dataEun, 'eun1', interaction, username)
    } else {
      interaction.reply(`\`[EUNE] Summoner ${username}not found\``)
    }
  }
  // HELP COMMAND

//   if (commandName === 'help') {
//     interaction.reply({ embeds: [helpReply()] })
//   }
// }

//HELP COMMAND WITH REACTION
if (commandName === 'help') {
  const message = await interaction.reply({ embeds: [helpReply()], fetchReply: true})
  await message.react('📖')
  const filter = (reaction, user) => {
    return ['📖'].includes(reaction.emoji.name) && user.id === interaction.user.id;
  }
  message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
  .then(collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === '📖') {
        // interaction.reply()
        setTimeout(() => message.delete(), 1000)
      }
  })
  .catch(collected => {
    setTimeout(() => message.delete(), 1000)
  });

// every time a reaction is added ...




    //  const filter = (reaction, user) => {
    //   return ['📖'].includes(reaction.emoji.name) && user.id === interaction.user.id;
    // }

    //   if (reaction.emoji.name === "📖") {
    //   reaction.message.delete()
    //   }

}
}

 

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}