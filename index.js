// ANYWAY XMD BOT by MR ANYWAY TECH
// Main entry file

const { hybridConfig, sessionId, PREFIX, OWNER_NAME, OWNER_NUMBER, BOT_NAME, BOT_IMAGE, CHANNEL_URL } = require('./config');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const P = require('pino');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = (lastDisconnect.error)?.output?.statusCode;
            console.log('Disconnected:', reason);
            startBot(); // restart bot
        } else if (connection === 'open') {
            console.log(`${BOT_NAME} is online ✅`);
        }
    });

    sock.ev.on('creds.update', saveCreds);

    console.log(`Bot Name: ${BOT_NAME}`);
    console.log(`Owner: ${OWNER_NAME} (${OWNER_NUMBER})`);
    console.log(`Channel: ${CHANNEL_URL}`);
    console.log(`Bot Image: ${BOT_IMAGE}`);
}

startBot();