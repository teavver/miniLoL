import { MessageEmbed } from "discord.js";


export default function endReply(data,data2,username,shortwr,serverText) {
    let description
    const queueTypeText = (data2.queueType==='RANKED_SOLO_5x5') ? 'Solo Duo: ':'Flex: '
    if (data2.queueType == undefined && data.summonerLevel < 30) {
        description = `Summoner is below lvl 30.`
    } else if (data2.queueType == undefined) {
        description = `Summoner has no rank or no recent ranked games`
    }

    else {
        description = `${queueTypeText} **${data2.tier} ${data2.rank}** | **${data2.wins}W / ${data2.losses}L\** | **${shortwr}%WR\**`
    }
    const endReply = new MessageEmbed()
    .setColor('#0099ff')
    // summoner name from main.js + jsbot icon
    .setAuthor({ name: `(${serverText.toUpperCase()}) (${data.summonerLevel}) ${data.name}`})
    // opgg link
    .setTitle(`${data.name}\'s OPGG`)
    .setURL(`https://${serverText}.op.gg/summoners/eune/${username}`)
    // data import from main.js 
    .setDescription(description)
    .setThumbnail(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data.profileIconId}.jpg`)
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Ranked Solo/Duo', value: '*\*Win\**, 26:55', inline: true },
        { name: 'Ranked Solo/Duo', value: '*\*Loss\**, 16:32', inline: true },
        { name: 'Ranked Solo/Duo', value: '*\*Win\**, 41:35', inline: true },
    )
    return endReply;
}

// if (data.queueType == undefined) {
//    .setDescription(`summoner has no rank`)
//}