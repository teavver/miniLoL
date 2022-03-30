import { endReply } from './embeds.js';
import { requestSpecificData } from './request.js';
import tierImgArr from './tiers.js'
export default async function reply(_data, _server, interaction, _username) {
    const serverText = (_server==='eun1') ? 'eune':'euw'
    const dataSpec = await requestSpecificData(_server,_data.id)
   const shortwr = (dataSpec.wins/(dataSpec.wins+dataSpec.losses)*100).toFixed(0)
   const reply = endReply(_data,dataSpec,_username,shortwr,serverText, tierImgArr[dataSpec.tier])
   interaction.reply({ embeds: [reply] })
 }