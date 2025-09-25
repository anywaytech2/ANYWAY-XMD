const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "ping",
  alias: ["mspeed", "speed"],
  use: "utility",
  desc: "Check bot response speed",
  category: "general",
  react: "🔥",
  filename: __filename
}, async (client, chat, msg, { from, quoted, sender, reply }) => {
  try {
    const start = Date.now();
    const reacts = ["✅", "🟢", "✨", "📶", "🔋"];
    const statuses = ["ONLINE", "CONNECTED", "RESPONDING", "ACTIVE", "RUNNING", "READY"];

    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const now = Date.now();
    const speed = now - start;

    let statusText = "⚡ FAST";
    if (speed > 3000) {
      statusText = "🐌 SLOW";
    } else if (speed > 500) {
      statusText = "⚠️ MEDIUM";
    }

    let profilePic;
    try {
      profilePic = await client.profilePictureUrl(sender, "image");
    } catch {
      profilePic = "https://files.catbox.moe/9j6ddi.png"; // fallback if no profile pic
    }

    const caption =
      "┏━━━━━━━━━━━━━━━━━━━━━━━┓\n" +
      `┃ 🤖 *Bot Name:* ${config.botName || "𝗔𝗡𝗬𝗪𝗔𝗬-𝗫𝗠𝗗"}\n` +
      "┣━━━━━━━━━━━━━━━━━━━━━━━\n" +
      `┃ ⚡ *Speed:* ${reacts[Math.floor(Math.random() * reacts.length)]} ${speed}ms\n` +
      "┣━━━━━━━━━━━━━━━━━━━━━━━\n" +
      `┃ 📶 *Status:* ${randomStatus}\n` +
      "┣━━━━━━━━━━━━━━━━━━━━━━━\n" +
      `┃ ⏱️ *Checked At:* ${new Date().toLocaleTimeString()}\n` +
      "┗━━━━━━━━━━━━━━━━━━━━━━━┛\n" +
      "*🤔 Your time is limited, so don’t waste it living someone else’s life.*";

    await client.sendMessage(
      from,
      {
        image: { url: profilePic },
        caption: caption,
        contextInfo: {
          mentionedJid: [sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363304536947506@newsletter",
            newsletterName: config.botName || "anyway xmd",
            serverMessageId: 143
          }
        }
      },
      { quoted: chat }
    );
  } catch (e) {
    console.error("PING_ERROR:", e);
    reply("❌ Error: " + e.message);
  }
});
