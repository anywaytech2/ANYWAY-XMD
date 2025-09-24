const { cmd } = require('../command');
const axios = require('axios');

// Contact verified
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
  pattern: "img",
  alias: ['image', 'googleimage', "searchimg"],
  react: '🦋',
  desc: "Search and download Google images",
  category: "fun",
  use: ".img <keywords>",
  filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
  try {
    const query = args.join(" ");
    if (!query) return reply("🖼️ *Please provide search keywords!*\n_Example: .img cute cats_");

    await reply(`🔍 *Searching images for:* "${query}" ...`);

    const res = await axios.get(`https://apis.davidcyriltech.my.id/googleimage?query=${encodeURIComponent(query)}`);
    if (!res.data?.success || !res.data.results?.length) {
      return reply("❌ *No images found. Try different keywords.*");
    }

    const results = res.data.results;
    const randomResults = results.sort(() => 0.5 - Math.random()).slice(0, 5);

    for (const imgUrl of randomResults) {
      await conn.sendMessage(from, {
        image: { url: imgUrl },
        caption: `╭───〔 *Image Result* 〕───⬣\n📷 Query: *${query}*\n🔗 Source: Google\n╰──✪ 𝙽𝙾𝚅𝙰 ┃ 𝚇𝙼𝙳 ✪──`,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363382023564830@newsletter",
            newsletterName: "𝙽𝙾𝚅𝙰-𝚇𝙼𝙳",
            serverMessageId: 10
          }
        }
      }, { quoted: quotedContact });

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

  } catch (err) {
    console.error("Image Search Error:", err);
    reply(`❌ *Error fetching images:*\n${err.message}`);
  }
});
