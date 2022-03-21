import fetch from "node-fetch"
import 'dotenv/config';
import { MessageSelectMenu } from "discord.js";

export default async function request(_server, _sumName){
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

export async function request2(_server, _accountId) {
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${_accountId}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const data2 = await response.json()
    const data = data2[0]
    
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

