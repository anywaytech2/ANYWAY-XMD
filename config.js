// ANYWAY XMD by ANYWAY TECH

const fs = require('fs-extra');
const path = require('path');

if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname + '/config.env' });

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL || databasePath;

// Hybrid Config Manager
class HybridConfigManager {
    constructor() {
        this.configDir = path.join(__dirname, 'config');
        this.configFile = path.join(this.configDir, 'settings.json');
        this.backupDir = path.join(this.configDir, 'backups');
        this.sessionId = this.generateSessionId();
        this.cache = new Map();
        this.initializeStorage();
    }

    generateSessionId() {
        return `anyway_session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    }

    initializeStorage() {
        try {
            fs.ensureDirSync(this.configDir);
            fs.ensureDirSync(this.backupDir);
            if (!fs.existsSync(this.configFile)) this.createDefaultConfig();
            this.loadConfigToCache();
        } catch (err) {
            console.error('Config initialization error:', err);
        }
    }

    createDefaultConfig() {
        const defaultConfig = {
            metadata: {
                version: '1.0.0',
                created: new Date().toISOString(),
                sessionId: this.sessionId
            },
            settings: {
                PUBLIC_MODE: 'yes',
                AUTO_READ: 'no',
                AUTO_READ_STATUS: 'yes',
                AUTO_DOWNLOAD_STATUS: 'no',
                AUTO_REACT: 'no',
                AUTO_REACT_STATUS: 'yes',
                AUTO_REPLY_STATUS: 'no',
                AUDIO_CHATBOT: 'no',
                CHATBOT: 'no',
                STARTING_BOT_MESSAGE: 'yes',
                PRESENCE: '',
                ANTIDELETE_SENT_INBOX: 'yes',
                ANTIDELETE_RECOVER_CONVENTION: 'no',
                AUTO_BIO: 'no',
                AUTO_REJECT_CALL: 'no',
                WELCOME_MESSAGE: 'no',
                GOODBYE_MESSAGE: 'no',
                GROUPANTILINK: 'no'
            }
        };
        fs.writeFileSync(this.configFile, JSON.stringify(defaultConfig, null, 2));
    }

    loadConfigToCache() {
        const config = fs.readJsonSync(this.configFile);
        this.cache.clear();
        Object.entries(config.settings).forEach(([key, value]) => this.cache.set(key, value));
    }

    async saveConfigFromCache() {
        const config = fs.readJsonSync(this.configFile);
        config.settings = Object.fromEntries(this.cache);
        config.metadata.lastUpdated = new Date().toISOString();
        fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
    }

    getSetting(key, defaultValue = null) {
        return this.cache.get(key) || defaultValue;
    }

    async setSetting(key, value) {
        this.cache.set(key, value);
        await this.saveConfigFromCache();
    }

    getSessionId() {
        return this.sessionId;
    }
}

const hybridConfig = new HybridConfigManager();

module.exports = {
    hybridConfig,
    session: process.env.SESSION_ID || '',
    sessionId: hybridConfig.getSessionId(),
    PREFIX: process.env.PREFIX || ".",
    GURL: 'https://whatsapp.com/channel/0029VagWQ255q08VTCRQKP09',
    OWNER_NAME: process.env.OWNER_NAME || "ANYWAY TECH",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "+255678892560",
    BOT: process.env.BOT_NAME || 'ANYWAY XMD',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,

    get AUTO_READ_STATUS() { return hybridConfig.getSetting('AUTO_READ_STATUS', 'yes'); },
    get AUTO_DOWNLOAD_STATUS() { return hybridConfig.getSetting('AUTO_DOWNLOAD_STATUS', 'no'); },
    get AUTO_REPLY_STATUS() { return hybridConfig.getSetting('AUTO_REPLY_STATUS', 'no'); },
    get MODE() { return hybridConfig.getSetting('PUBLIC_MODE', 'yes'); },
    get CHATBOT() { return hybridConfig.getSetting('CHATBOT', 'no'); },
    get AUDIO_CHATBOT() { return hybridConfig.getSetting('AUDIO_CHATBOT', 'no'); },
    get STARTING_BOT_MESSAGE() { return hybridConfig.getSetting('STARTING_BOT_MESSAGE', 'yes'); },
    get ANTIDELETE_SENT_INBOX() { return hybridConfig.getSetting('ANTIDELETE_SENT_INBOX', 'yes'); },
    get ANTIDELETE_RECOVER_CONVENTION() { return hybridConfig.getSetting('ANTIDELETE_RECOVER_CONVENTION', 'no'); },
    get GOODBYE_MESSAGE() { return hybridConfig.getSetting('GOODBYE_MESSAGE', 'no'); },
    get AUTO_REJECT_CALL() { return hybridConfig.getSetting('AUTO_REJECT_CALL', 'no'); },
    get WELCOME_MESSAGE() { return hybridConfig.getSetting('WELCOME_MESSAGE', 'no'); },
    get GROUPANTILINK() { return hybridConfig.getSetting('GROUPANTILINK', 'no'); },

    BOT_URL: process.env.BOT_URL ? process.env.BOT_URL.split(',') : [
        'https://files.catbox.moe/9j6ddi.png'
    ],

    MENU_TOP_LEFT: process.env.MENU_TOP_LEFT || "┌─❖",
    MENU_BOT_NAME_LINE: process.env.MENU_BOT_NAME_LINE || "│ ",
    MENU_BOTTOM_LEFT: process.env.MENU_BOTTOM_LEFT || "└┬❖",
    MENU_GREETING_LINE: process.env.MENU_GREETING_LINE || "┌┤ ",
    MENU_DIVIDER: process.env.MENU_DIVIDER || "│└────────┈⳹",
    MENU_USER_LINE: process.env.MENU_USER_LINE || "│🕵️ ",
    MENU_DATE_LINE: process.env.MENU_DATE_LINE || "│📅 ",
    MENU_TIME_LINE: process.env.MENU_TIME_LINE || "│⏰ ",
    MENU_STATS_LINE: process.env.MENU_STATS_LINE || "│⭐ ",
    MENU_BOTTOM_DIVIDER: process.env.MENU_BOTTOM_DIVIDER || "└─────────────┈⳹",

    FOOTER: process.env.BOT_FOOTER || '\n\nFor more info visit: anywayboost.com\n\n®2025 ANYWAY XMD 🔥',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath ? databasePath : DATABASE_URL
};