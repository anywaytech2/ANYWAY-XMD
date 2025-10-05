const { proto } = require('@whiskeysockets/baileys')

module.exports = {
  name: "repo",
  alias: ["repository", "source"],
  desc: "Show official Anyway-XMD repository and links",
  category: "info",
  usage: "repo",
  react: "💚",

  start: async (client, m, { from }) => {

    const message = `
╔════◇
│💚 *ANYWAY-XMD OFFICIAL LINKS* 💚
╚═══════════════════════◇

🚀 *WHATSAPP CHANNEL*
➤ https://whatsapp.com/channel/0029VagWQ255q08VTCRQKP09

💬 *GROUP*
➤ Coming soon...

🧩 *GITHUB REPOSITORY*
➤ https://github.com/Anywaytech2/ANYWAY-XMD

🌐 *OFFICIAL WEBSITE*
➤ https://www.anywayboost.com

▶️ *YOUTUBE CHANNEL*
➤ https://youtube.com/@anyway-tech?si=I_nLxT0SQTIbbE2G

───────────────────────
⚡ *DESIGNED & POWERED BY ANYWAY TECH* ⚡
───────────────────────
`;

    await client.sendMessage(from, {
      image: { url: "https://files.catbox.moe/oyw1oa.jpeg" },
      caption: message,
      footer: "© ANYWAY TECH 2025",
      buttons: [
        { buttonId: "menu", buttonText: { displayText: "📜 MENU" }, type: 1 },
        { buttonId: "ping", buttonText: { displayText: "⚙️ STATUS" }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m });
  }
};
