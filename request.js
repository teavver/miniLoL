import fetch from "node-fetch"

// const server = 'eun1'
// const sumName = 'l9%20itachi' 
// const sp = ("%20")

export default async function request(_server, _sumName){
    const response = await fetch(`https://${_server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${_sumName}`, {
        method: 'get',
        headers: {
            "X-Riot-Token": "RGAPI-c1126e0d-c76d-47d1-82e7-5facb92a20a7"
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
