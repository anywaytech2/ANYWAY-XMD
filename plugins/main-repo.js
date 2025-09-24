const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { cmd } = require('../command');

// Verified contact
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
  pattern: "repo",
  alias: ["sc", "script", "info"],
  desc: "Fetch GitHub repository information",
  react: "💗",
  category: "info",
  filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
  const githubRepoURL = 'https://github.com/novaxmd/NOVA-XMD';

  try {
    // Extract username & repo name
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

    // Fetch GitHub API
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
    const repoData = await response.json();

    // Repo info style (moja safi)
    const repoInfo = `
╭━━━「 ${config.BOT_NAME} REPO 」━━━➤
│ 📦 Name: ${repoData.name}
│ 👤 Owner: ${repoData.owner.login}
│ ⭐ Stars: ${repoData.stargazers_count}
│ 🍴 Forks: ${repoData.forks_count}
│ 🌐 URL: ${repoData.html_url}
╰━━━━━━━━━━━━━━━━━━━━━━━➤
🔗 ${config.DESCRIPTION}
`;

    // Select random image from /plugins
    const scsFolder = path.join(__dirname, "../plugins");
    const images = fs.readdirSync(scsFolder).filter(f => /^menu\d+\.jpg$/i.test(f));
    const imageOption = images.length > 0
      ? { url: path.join(scsFolder, images[Math.floor(Math.random() * images.length)]) }
      : { url: "https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png" };

    // Message options
    const messageOptions = {
      image: imageOption,
      caption: repoInfo.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true
      }
    };

    await conn.sendMessage(from, messageOptions, { quoted: quotedContact });

  } catch (error) {
    console.error("Repo command error:", error);
    reply(`❌ Error: ${error.message}`);
  }
});
