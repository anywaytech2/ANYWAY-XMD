const { cmd } = require('../command');
const config = require('../config');

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
    pattern: "owner",
    react: "✅", 
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` + 
                      'END:VCARD';

        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        const caption = `🚀 OWNER INFO 🚀
━━━━━━━━━━━━━━━━━━━━━━
📛 Name   : ${ownerName}
📞 Number : ${ownerNumber}
⚙️ Role   : Developer & Founder
📦 Version: 2.0.0 Beta
⚡ Powered by 𝙽𝙾𝚅𝙰-𝚇𝙼𝙳 ⚡`;

        await conn.sendMessage(from, {
            text: caption,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363382023564830@newsletter',
                    newsletterName: '𝙽𝙾𝚅𝙰-𝚇𝙼𝙳',
                    serverMessageId: 143
                }
            }
        }, { quoted: quotedContact });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
