const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd, commands } = require('../command');

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
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ANYWAY VERIFIED ✅\nORG:ANYWAY-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255678892560:255678892560\nEND:VCARD"
    }
  }
};

// JawadTechX

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {

        const contextInfo = {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363304536947506@newsletter",
            newsletterName: "𝗔𝗡𝗬𝗪𝗔𝗬-𝗫𝗠𝗗",
            serverMessageId: 1
          }
        };

        if (!isGroup) {
            return reply(`
╭───「 *ERROR* 」───╮
│ ❌ This command can only be used in groups.
╰──────────────────╯
            `.trim(), { quoted: quotedContact, contextInfo });
        }

        const botOwner = conn.user.id.split(":")[0]; 
        if (senderNumber !== botOwner) {
            return reply(`
╭───「 *ACCESS DENIED* 」───╮
│ 🚫 Only the bot owner can use this command.
╰──────────────────────────╯
            `.trim(), { quoted: quotedContact, contextInfo });
        }

        reply(`
╭───「 *BOT MESSAGE* 」───╮
│ ℹ️ Leaving the group...
╰────────────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });

        await sleep(1500);
        await conn.groupLeave(from);

        reply(`
╭───「 *BOT MESSAGE* 」───╮
│ 👋 Goodbye!
│ ✅ Left the group successfully.
╰────────────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });

    } catch (e) {
        console.error(e);
        reply(`
╭───「 *ERROR* 」───╮
│ ❌ An error occurred:
│ ${e.message}
╰──────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });
    }
});
