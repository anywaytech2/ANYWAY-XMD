const config = require('../config')
const l = console.log
const { cmd, commands } = require('../command')
const dl = require('@bochilteam/scraper')  
const ytdl = require('yt-search');
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts jawad',
    react: "🔎",
    desc: "Search and get details from youtube.",
    category: "search",
    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return reply('*Please give me words to search*')
  try {
    let yts = require("yt-search")
    var arama = await yts(q);
  } catch(e) {
    l(e)
    return await conn.sendMessage(from , { text: '*Error !!*' }, { quoted: mek } )
  }
  var mesaj = '';
  arama.all.map((video) => {
    mesaj += ' *🖲️' + video.title + '*\n🔗 ' + video.url + '\n\n'
  });

  await conn.sendMessage(from , {
    text: mesaj,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363382023564830@newsletter",
        newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
        serverMessageId: 1
      }
    }
  }, { quoted: mek })

} catch (e) {
  l(e)
  reply('*Error !!*')
}
});
