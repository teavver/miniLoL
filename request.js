import fetch from "node-fetch"
import 'dotenv/config';
import { MessageSelectMenu } from "discord.js";

export async function requestBasicData(_server, _sumName){
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${_sumName}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const data = await response.json()
    const status = response.status
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
    // sprawdza czy dlugosc tablicy jest wieksza od 1, jesli tak to zwroc tylko s/d range, jesli nie to zwroc
    // jedyną range na koncie 
    let data
    if (json.length > 1) data = json[1]
    else data = json[0]
    
    return {
        queueType: data.queueType,
        tier: data.tier,
        rank: data.rank,
        summonerName: data.summonerName,
        leaguePoints: data.leaguePoints,
        wins: data.wins,
        losses: data.losses
    }

}

// export async function requestServer








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
