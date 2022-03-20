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
        revisionDate: data.revisionDate,
        summonerLevel: data.summonerLevel
    }
    

}
