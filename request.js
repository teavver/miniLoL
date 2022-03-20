import fetch from "node-fetch"
import 'dotenv/config';

export default async function request(_server, _sumName){
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${_sumName}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const data = await response.json()
    return {
        accountId: data.accountId,
        name: data.name,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel
    }
    

}
export default async function request(_server, accountId) {
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const data = await response.json()
    return {
        queueType: data.queueType,
        tier: data.tier,
        rank: data.rank,
        summonerName: data.summonerName,
        leaguePoints: data.LP,
        wins: data.wins,
        losses: data.losses
    }

}

