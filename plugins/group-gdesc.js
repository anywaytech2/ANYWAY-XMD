const config = require('../config')
const { cmd } = require('../command')

const quotedContact = {
    key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "B.M.B VERIFIED ✅",
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=254769529791:254769529791\nEND:VCARD"
        }
    }
};

cmd({
    pattern: "updategdesc",
    alias: ["upgdesc", "gdesc"],
    react: "📜",
    desc: "Change the group description.",
    category: "group",
    filename: __filename
},           
async (conn, mek, m, { from, isGroup, isAdmins, isBotAdmins, q, reply }) => {
    const contextInfo = {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
            serverMessageId: 1
        }
    };

    if (!isGroup) return reply(`
╭───「 *ERROR* 」───╮
│ ❌ This command can only be used in groups.
╰──────────────────╯
    `.trim(), { quoted: quotedContact, contextInfo });

    if (!isAdmins) return reply(`
╭───「 *ACCESS DENIED* 」───╮
│ 🚫 Only group admins can use this command.
╰──────────────────────────╯
    `.trim(), { quoted: quotedContact, contextInfo });

    if (!isBotAdmins) return reply(`
╭───「 *BOT ERROR* 」───╮
│ ⚠️ I need to be an admin to update the group description.
╰──────────────────────╯
    `.trim(), { quoted: quotedContact, contextInfo });

    if (!q) return reply(`
╭───「 *USAGE* 」───╮
│ ❌ Please provide a new group description.
╰──────────────────╯
    `.trim(), { quoted: quotedContact, contextInfo });

    try {
        await conn.groupUpdateDescription(from, q);
        return reply(`
╭───「 *SUCCESS* 」───╮
│ ✅ Group description has been updated.
╰───────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });
    } catch (e) {
        console.error("Error updating group description:", e);
        return reply(`
╭───「 *ERROR* 」───╮
│ ❌ Failed to update the group description. Please try again.
╰──────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });
    }
});
            
