const { cmd } = require('../command');

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
            vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=254769529791:+254769529791\nEND:VCARD"
        }
    }
};

cmd({
    pattern: "remove",
    alias: ["kick", "k"],
    desc: "Removes a member from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, quoted, senderNumber
}) => {
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

    const botOwner = conn.user.id.split(":")[0];
    if (senderNumber !== botOwner) {
        return reply(`
╭───「 *ACCESS DENIED* 」───╮
│ 🚫 Only the bot owner can use this command.
╰──────────────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });
    }

    if (!isBotAdmins) return reply(`
╭───「 *BOT PERMISSION ERROR* 」───╮
│ ❌ I need to be an admin to remove someone.
╰────────────────────────────────╯
    `.trim(), { quoted: quotedContact, contextInfo });

    let number;
    if (m.quoted) {
        number = m.quoted.sender.split("@")[0];
    } else if (q && q.includes("@")) {
        number = q.replace(/[@\s]/g, '');
    } else {
        return reply(`
╭───「 *USAGE* 」───╮
│ ❌ Please reply to a user or mention them.
╰──────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });
    }

    const jid = number + "@s.whatsapp.net";

    try {
        await conn.groupParticipantsUpdate(from, [jid], "remove");
        reply(`
╭───「 *SUCCESS* 」───╮
│ ✅ Successfully removed: @${number}
╰──────────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo, mentions: [jid] });
    } catch (error) {
        console.error("Remove command error:", error);
        reply(`
╭───「 *ERROR* 」───╮
│ ❌ Failed to remove the member.
│ 💬 Reason: ${error.message}
╰──────────────────╯
        `.trim(), { quoted: quotedContact, contextInfo });
    }
});
