import { MessageEmbed } from "discord.js";

export const helpEmbed = new MessageEmbed()
    .setColor('#0099ff')
    // summoner name from main.js + jsbot icon
    .setAuthor({ name: '(EUNE) L9 Itachi',})
    // data import from main.js 
    .setDescription('Diamond 4 | 26W | 26L | 50%WR')
    .setThumbnail('https://i.imgur.com/UzxApzy.jpg')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Ranked Solo/Duo', value: '\`Win\`, 26:55', inline: true },
        { name: 'Ranked Solo/Duo', value: '\`Loss\`, 16:32', inline: true },
        { name: 'Ranked Solo/Duo', value: '\`Win\`, 41:35', inline: true },
    )
    .setFooter({ text:'OPGG:' ,url:'https://eune.op.gg/summoners/eune/L9%20Itachi'});



export const smmnrEmbed = new MessageEmbed()
    .setColor('GREY')
    .setThumbnail('https://i.imgur.com/UzxApzy.jpg')
    