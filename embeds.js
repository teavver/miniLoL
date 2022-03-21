import { MessageEmbed } from "discord.js";


export default function helpEmbed(data,data2,username,shortwr) {
    const helpEmbed = new MessageEmbed()
    .setColor('#0099ff')
    // summoner name from main.js + jsbot icon
    .setAuthor({ name: `(EUNE) ${data.name}`})
    // opgg link
    .setTitle('Summoner\'s OPGG')
    .setURL(`https://eune.op.gg/summoners/eune/${username}`)
    // data import from main.js 
    .setDescription(`${data2.tier} ${data2.rank} | ${data2.wins}W / ${data2.losses}L | ${shortwr}%WR`)
    .setThumbnail(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data.profileIconId}.jpg`)
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Ranked Solo/Duo', value: '\`Win\`, 26:55', inline: true },
        { name: 'Ranked Solo/Duo', value: '\`Loss\`, 16:32', inline: true },
        { name: 'Ranked Solo/Duo', value: '\`Win\`, 41:35', inline: true },
    )
    return helpEmbed;
}

