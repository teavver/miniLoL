import fetch from "node-fetch"
import 'dotenv/config';

export async function requestBasicData(_server, _sumName){
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${_sumName}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const data = await response.json()
    const status = response.status
    console.log(status)
    if (status == 404) {
        return {
            status: false
        }
    }
    return {
        accountId: data.accountId,
        name: data.name,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel,
        id: data.id,
        status: true
    }
}

export async function requestSpecificData(_server, _Id) {
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${_Id}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const json = await response.json()
    let data
    if (json.length == 0) return {status:false}

    if(json[0].queueType == 'RANKED_FLEX_SR') data = json[1]
    else if (json[0].queueType == 'RANKED_TFT_PAIRS') data = json[2]
    else data = json[0]

    return {
        queueType: data.queueType,
        tier: data.tier,
        rank: data.rank,
        leaguePoints: data.lp,
        summonerName: data.summonerName,
        leaguePoints: data.leaguePoints,
        wins: data.wins,
        losses: data.losses
    }

}

// export async function requestMatches(_server, _accountId) {
//     const response = await fetch(`https://${_server}.api.riotgames.com/lol/v1.3/game/by-summoner/${_accountId}/recent`, {
//         method: 'get',
//         headers: {
//             "X-Riot-Token": process.env.RIOT_TOKEN
//         }
//     })
//     const json = await response.json()
//     const data = json[0]
    
// }
