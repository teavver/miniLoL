import fetch from "node-fetch"
import 'dotenv/config';
import { codeBlock } from "discord.js";

export async function requestBasicData(_server, _sumName){
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${_sumName}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": process.env.RIOT_TOKEN
        }
    })
    const data = await response.json()
    const status = response.status
    if (status == 404) return { status: false }
    return {
        accountId: data.accountId,
        name: data.name,
        profileIconId: data.profileIconId,
        summonerLevel: data.summonerLevel,
        id: data.id,
        status: true
    }
}

export async function requestMmrData(_server, _sumName){
    const response = await fetch(`https://${_server}.whatismymmr.com/api/v1/summoner?name=${_sumName}`, {
        method: 'get'
    })
    const data = await response.json()
    if(data.error) {
        console.log('CANT FETCH')
        console.log('error: '+ data.error.code)
        const mmr = 'null'
        return mmr
    } else if (data.ranked) {
        const mmr = data.ranked.avg
        const err = data.ranked.err
        const perc = (data.ranked.percentile != undefined) ? data.ranked.percentile : "0"
        console.log(perc)
        const mmr_all = [mmr, err, perc]
        return mmr_all
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
    for (let i = 0; i < json.length; i++) {
        const mode = json[i];
        if(mode.queueType == 'RANKED_SOLO_5x5'){
            data = mode;
            break;
        }
        else data = 0;
    }
    if (data === 0) return {status: false}
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