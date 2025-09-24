const config = require('../config');
const { cmd } = require('../command');
const { getGroupAdmins } = require('../lib/functions');

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
  pattern: "tagall",
  react: "🔊",
  alias: ["gc_tagall"],
  desc: "To Tag all Members",
  category: "group",
  use: '.tagall [message]',
  filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, command, body }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const botOwner = conn.user.id.split(":")[0];
    const senderJid = senderNumber + "@s.whatsapp.net";

    if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
      return reply("❌ Only group admins or the bot owner can use this command.");
    }

    const groupInfo = await conn.groupMetadata(from).catch(() => null);
    if (!groupInfo) return reply("❌ Failed to fetch group info.");

    const groupName = groupInfo.subject || "Unknown Group";
    const totalMembers = participants.length;

    const emojis = ['📢','🔊','🌐','🔰','❤‍🩹','🤍','🖤','🩵','📝','💗','🔖','🪩','📦','🎉','🛡️','💸','⏳','🗿','🚀','🎧','🪀','⚡','🚩','🍁','🗣️','👻','⚠️','🔥'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const message = body.slice(body.indexOf(command) + command.length).trim() || "📣 Attention Everyone!";

    let teks = `╭───〔 *📢 GROUP MENTION* 〕───⬣
│
│ *📛 Group:* ${groupName}
│ *👥 Members:* ${totalMembers}
│ *💬 Message:* ${message}
│
╰──⊱ Mentioning All ⊰──⬣\n`;

    for (const mem of participants) {
      if (!mem.id) continue;
      teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
    }

    teks += `\n╰─⧈ 𝗡𝗢𝗩𝗔 ┃ 𝗫𝗠𝗗 ⧈─⬣`;

    await conn.sendMessage(from, {
      text: teks,
      mentions: participants.map(a => a.id),
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363382023564830@newsletter",
          newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
          serverMessageId: 1
        }
      }
    }, { quoted: quotedContact });

  } catch (e) {
    console.error("TagAll Error:", e);
    reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
  }
});
      
