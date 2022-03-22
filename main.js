// require Discord API
import { Channel, Client, Intents, MessageEmbed} from 'discord.js';
import request, { request2 } from './request.js';
import 'dotenv/config';
import helpEmbed from './embeds.js'
// import './embeds.js';
// message embed utility
// const { MessageEmbed } = require('discord.js')


// changing space to space character in order to avoid spacing errors
const sp = ("%20");
// create client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
//
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
// $help command
client.on("messageCreate", msg => {
  if (msg.content === "$help") {
    msg.reply({ embeds: [helpEmbed] });
    // msg.reply("Type \`$help-all\` to see help for all commands. Type \`$help command-name\` To get more information about a specific command.")
  }
  // $user command
  if(msg.content.includes('$user')) {
    const username = replaceAll(msg.content.slice(6), " ","%20")
     req()
      async function req() {
       const data = await request('eun1', username)
       if (data.status) {
        const data2 = await request2('eun1', data.id)
        const wr = data2.wins/(data2.wins+data2.losses)*100
        const shortwr = wr.toFixed(0)
        const reply = helpEmbed(data,data2,username,shortwr)
        msg.reply({ embeds: [reply] });
        console.log(data2.wins,data2.losses,wr,shortwr)
       } else {
         msg.reply(`Summoner not found in the database`)
       }
      } 
    }
})

const botToken = process.env.TOKEN
client.login(process.env.TOKEN)

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}


// status code:
// 400 - bad request (jeszcze nie bylo takiego przypadku)
// 404 - not found (jak nie ma takiego konta na serwerze)
// 200 - poszlo

// funkcja 1()  {
  // riotAPI(eune) -> wyszukaj summonera po nazwie
  // store statusCode.eune
  // riotAPI(euw) -> wyszukaj summonera po nazwie
  // store statusCode.euw
  // if (statusCode.eune i statusCode.euw = 200) {

  //   popros usera o wpisanie serwera $euw lub $eune
  //   jesli user input = $eune -> funkcja replyEune
  //   jesli user input = $euw -> funkcja replyEuw

  //   else return/abort/nic nie odpowiadaj
  //   else if (statusCode.eune = 200 || statusCode.euw = 404) {
  //     funkcja() replyEune()
  //   }
  //   else if (statusCode.euw = 200 || statusCode.eune = 404) {
  //     funkcja() replyEuw()
  //   }
  //   else {
  //     reply nie znaleziono summonera
  //   }
  // }
//}
