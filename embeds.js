import pkg from 'discord.js';
const {EmbedBuilder} = pkg;

export function endReply(data,data2,username,shortwr,serverText,tierImg,mmrAvg){
    let description
    const queueTypeText = (data2.queueType==='RANKED_SOLO_5x5') ? 'Solo Duo: ':'Flex: '
    if (data2.queueType == undefined && data.summonerLevel < 30) {
        description = `Summoner is below lvl 30.`
    } else if (data2.queueType == undefined) {
        description = `Summoner has no rank or no recent ranked games`
    }
    else {
        description = `${queueTypeText} **${data2.tier} ${data2.rank} ${data2.leaguePoints}LP** \n Games: **${data2.wins} W** / **${data2.losses} L\** | **${shortwr}%WR\** \n MMR: **${mmrAvg}**`
    }

    const endReply = new EmbedBuilder()
    .setColor('#0099ff')
    // summoner name from main.js + jsbot icon
    .setAuthor({iconURL:tierImg, name: `(${serverText.toUpperCase()}) (${data.summonerLevel}) ${data.name}`})
    // opgg link
    .setTitle(`${data.name}\'s OPGG`)
    .setURL
    (`https://${serverText}.op.gg/summoners/${serverText}/${username}`)
    // data import from main.js 
    .setDescription(description)
    .setThumbnail
    (`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${data.profileIconId}.jpg`)
    return endReply;
}

export function helpReply() {
    const helpReply = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('How to use the bot')
    .addFields(
        {name: '/User command', value: 'Use the /user command only if you don\'t know the server your summoner\'s playing on.'},
        {name: '/Euw and /Eune commands', value: 'Type in /euw or /eune followed by a space and your summoner\'s name to get their stats.'},
        {name: 'Have fun!', value: '(Click the book emoji to close this message.)'}
    )
    return helpReply;
}

export function notFound(server,summoner) {
    const notFound = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`(${server}) Summoner ${summoner} not found.`)
    return notFound
}