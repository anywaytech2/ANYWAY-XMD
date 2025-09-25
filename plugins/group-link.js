const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

// Contact message for verified context
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "ANYWAY VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ANYWAY VERIFIED ✅\nORG:ANYWAY-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255678892560:+255 761 374656\nEND:VCARD"
    }
  }
};

cmd({
  pattern: "invite",
  alias: ["glink", "link"],
  desc: "Get group invite link.",
  category: "group",
  filename: __filename,
},
async (conn, mek, m, { from, quoted, body, args, q, isGroup, sender, reply }) => {
  try {
    if (!isGroup) return reply("❌ This feature is only for *groups*.");

    const senderNumber = sender.split('@')[0];
    const botNumber = conn.user.id.split(':')[0];
    const metadata = await conn.groupMetadata(from);
    const groupAdmins = metadata.participants.filter(p => p.admin);
    const isBotAdmins = groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net');
    const isAdmins = groupAdmins.some(admin => admin.id === sender);

    if (!isBotAdmins) return reply("❌ Bot needs to be an admin.");
    if (!isAdmins) return reply("❌ You must be an admin to use this command.");

    const code = await conn.groupInviteCode(from);
    if (!code) return reply("❌ Failed to get the group invite link.");

    const link = `https://chat.whatsapp.com/${code}`;
    const groupName = metadata.subject;

    const messageText = `╭───〔 *GROUP INVITE LINK* 〕───⬣
│
│ *📛 Group:* ${groupName}
│ *🔗 Link:* 
│ ${link}
│
╰━━━━━━━━━━━━━━━━━━━━⬣`;

    await conn.sendMessage(from, {
      text: messageText,
      contextInfo: {
        mentionedJid: [sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304536947506@newsletter',
          newsletterName: '🌐𝘼𝙉𝙔𝙒𝘼𝙔-𝙓𝙈𝘿🌐',
          serverMessageId: 143
        }
      }
    }, { quoted: quotedContact });

  } catch (error) {
    console.error("Error in invite command:", error);
    reply(`❌ An error occurred: ${error.message || "Unknown error"}`);
  }
});
