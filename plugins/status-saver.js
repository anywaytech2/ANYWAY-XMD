const { cmd } = require("../command");

// VCard Contact (B.M.B VERIFIED ✅)
const quotedContact = {
  key: {
    fromMe: false,
    participant: `0@s.whatsapp.net`,
    remoteJid: "status@broadcast"
  },
  message: {
    contactMessage: {
      displayName: "B.M.B VERIFIED ✅",
      vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:B.M.B VERIFIED ✅\nORG:BMB-TECH BOT;\nTEL;type=CELL;type=VOICE;waid=255767862457:+255 767 862 457\nEND:VCARD"
    }
  }
};

// Newsletter context
const newsletterContext = {
  contextInfo: {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363382023564830@newsletter",
      newsletterName: "𝙱.𝙼.𝙱-𝚇𝙼𝙳",
      serverMessageId: 1
    }
  }
};

cmd({
  pattern: "send",
  alias: ["sendme", 'save'],
  react: '📤',
  desc: "Forwards quoted message back to user",
  category: "utility",
  filename: __filename
}, async (client, message, match, { from }) => {
  try {
    if (!match.quoted) {
      const boxText = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🍁 *Please reply to a message!*
┗━━━━━━━━━━━━━━━━━━━━━━━`;

      return await client.sendMessage(from, {
        text: boxText,
        ...newsletterContext
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    const mtype = match.quoted.mtype;
    const options = { quoted: message, ...newsletterContext };

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "image/jpeg",
          ...newsletterContext
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || '',
          mimetype: match.quoted.mimetype || "video/mp4",
          ...newsletterContext
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false,
          ...newsletterContext
        };
        break;
      default:
        const unsupportedBox = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ❌ *Only image, video, and audio messages are supported*
┗━━━━━━━━━━━━━━━━━━━━━━━`;

        return await client.sendMessage(from, {
          text: unsupportedBox,
          ...newsletterContext
        }, { quoted: message });
    }

    await client.sendMessage(from, messageContent, options);
  } catch (error) {
    console.error("Forward Error:", error);

    const errorBox = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ❌ *Error forwarding message:*
┃ ${error.message}
┗━━━━━━━━━━━━━━━━━━━━━━━`;

    await client.sendMessage(from, {
      text: errorBox,
      ...newsletterContext
    }, { quoted: message });
  }
});
