const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

// Contact message for verified context
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "B.M.B VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255767862457:+255 767 862457\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "ginfo",
  react: "🥏",
  alias: ["groupinfo"],
  desc: "Get group informations.",
  category: "group",
  use: '.ginfo',
  filename: __filename
},
async (conn, mek, m, {
  from, quoted, isGroup, isAdmins, isDev, isBotAdmins, groupMetadata, participants, reply
}) => {
  try {
    const msr = (await fetchJson('https://raw.githubusercontent.com/JawadTech3/KHAN-DATA/refs/heads/main/MSG/mreply.json')).replyMsg;

    if (!isGroup) return reply(msr.only_gp);
    if (!isAdmins && !isDev) return reply(msr.you_adm, { quoted: mek });
    if (!isBotAdmins) return reply(msr.give_adm);

    const ppUrls = [
      'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
      'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
      'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    ];
    let ppUrl = await conn.profilePictureUrl(from, 'image').catch(() => null);
    if (!ppUrl) {
      ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
    }

    const metadata = await conn.groupMetadata(from);
    const groupAdmins = participants.filter(p => p.admin);
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
    const owner = metadata.owner || metadata.participants.find(p => p.admin === 'superadmin')?.id;

    const gdata = `╭──────[ *GROUP INFO* ]──────⬣
│ 
│ *📛 Name:* ${metadata.subject}
│ *🆔 Jid:* ${metadata.id}
│ *👥 Members:* ${metadata.size}
│ *👑 Creator:* @${owner?.split('@')[0] || 'Unknown'}
│ *📝 Description:*
│ ${metadata.desc?.toString() || 'N/A'}
│ 
│ *🛡️ Admins:*
│ ${listAdmin}
│ 
╰━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(from, {
      image: { url: ppUrl },
      caption: gdata,
      contextInfo: {
        mentionedJid: groupAdmins.map(v => v.id).concat(owner),
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363382023564830@newsletter',
          newsletterName: '🌐𝗡𝗢𝗩𝗔-𝗫𝗠𝗗🌐',
          serverMessageId: 143
        }
      }
    }, { quoted: quotedContact });

  } catch (e) {
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    console.log(e);
    reply(`❌ *Error Occurred!*\n\n${e}`);
  }
});
