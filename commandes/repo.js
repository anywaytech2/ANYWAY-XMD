const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "repo", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╔════════════════╗  
  ༆ *𝐑𝐄𝐏𝐎 & 𝐆𝐑𝐎𝐔𝐏𝐒* ༆ 
╚════════════════╝  
  
✅ *CHANNEL*  
➤  https://whatsapp.com/channel/0029VatokI45EjxufALmY32X
  
🧷 *GROUP*  
➤ https://chat.whatsapp.com/DTnrZzULVtP5r0E9rhoFOj
  
🌟 *REPO*  
➤ https://github.com/rahzyn/HEROKU-BT
  
▶️ *PAIR SITE*  
➤ https://heroku-1-csyv.onrender.com
  
══════════════  
🌀 *DESIGNED BY* 𝐇𝐄𝐑𝐎𝐊𝐔-𝐁𝐓
══════════════  
  
🔔 *Stay Connected!*  
💬 _𝑱𝒐𝒊𝒏 𝒖𝒔 𝒇𝒐𝒓 𝒖𝒑𝒅𝒂𝒕𝒆𝒔 𝒂𝒏𝒅 𝒆𝒙𝒄𝒍𝒖𝒔𝒊𝒗𝒆 𝒄𝒐𝒏𝒕𝒆𝒏𝒕._  
  
🔥 *DON’T FORGET TO:*  
➤ 𝑺𝒕𝒂𝒓 𝒕𝒉𝒆 𝒓𝒆𝒑𝒐 ⭐  
➤ 𝑭𝒐𝒍𝒍𝒐𝒘 𝑾𝑨𝒄𝒉𝒂𝒏𝒏𝒆𝒍 🔔  
➤ 𝑺𝒉𝒂𝒓𝒆 𝒘𝒊𝒕𝒉 𝒇𝒓𝒊𝒆𝒏𝒅𝒔 \n
  `;
    
let menuMsg = `
     𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐄𝐃 𝐁𝐘 𝐑𝐚𝐡𝐦𝐚𝐧𝐢

❒────────────────────❒`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

}); 
