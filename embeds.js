import { MessageEmbed } from "discord.js";


export default function endReply(data,data2,username,shortwr,serverText,tierImg) {
    let description
    const queueTypeText = (data2.queueType==='RANKED_SOLO_5x5') ? 'Solo Duo: ':'Flex: '
    if (data2.queueType == undefined && data.summonerLevel < 30) {
        description = `Summoner is below lvl 30.`
    } else if (data2.queueType == undefined) {
        description = `Summoner has no rank or no recent ranked games`
    }

    else {
        description = `${queueTypeText} **${data2.tier} ${data2.rank}** \n **${data2.wins}W / ${data2.losses}L\** | **${shortwr}%WR\**`
    }
    const endReply = new MessageEmbed()
    .setColor('#0099ff')
    // summoner name from main.js + jsbot icon
    .setAuthor({iconURL:tierImg, name: `(${serverText.toUpperCase()}) (${data.summonerLevel}) ${data.name}`})
    // opgg link
    .setTitle(`${data.name}\'s OPGG`)
    .setURL(`https://${serverText}.op.gg/summoners/eune/${username}`)
    // data import from main.js 
    .setDescription(description)
    .setThumbnail(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data.profileIconId}.jpg`)
    // .addFields(
    //     { name: '\u200B', value: '\u200B' },
    //     { name: 'Ranked Solo/Duo', value: '*\*Win\**, 26:55', inline: true },
    //     { name: 'Ranked Solo/Duo', value: '*\*Loss\**, 16:32', inline: true },
    //     { name: 'Ranked Solo/Duo', value: '*\*Win\**, 41:35', inline: true },
    // )
    return endReply;
}

// if (data.queueType == undefined) {
//    .setDescription(`summoner has no rank`)
//}



// https://i.imgur.com/M3Rr4vi.png iron
// https://i.imgur.com/ONXlyi7.png bronze
// https://i.imgur.com/aR711ex.png silver
// https://i.imgur.com/nAJGTyr.png gold
// https://i.imgur.com/JWK6J0o.png platinum
// https://i.imgur.com/56SmgT3.png diamond
// https://i.imgur.com/IGTUePR.png master
// https://i.imgur.com/zo0jFrT.png grandmaster
// https://i.imgur.com/Tcj6YJH.png challenger