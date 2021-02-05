const token = '1668037380:AAEVRY00NfsIA0bea_lD_ciT2wc9m4HylOI';

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const telegramGroupId = -549708490;

const botMind = require('./mind.js');

bot.onText(/\/bot (.+)/, (msg, match) => {
    botMind(bot, msg, match);
});

bot.on('polling_error', (error) => {
    console.log(error.message); // => 'EFATAL'
});

module.exports = class TellerBot {

    constructor() {
        this.newItemPrefix = '\n👉 Novo Item encontrado';
        this.textOptions = { parse_mode: 'Markdown' }
    }

    getMessage(source, item) {
        return this.newItemPrefix + ' no ' + source + ' por __' + item.price + '__:\n[' + item.title + '](' + item.link + ')\n ';
    }

    newItemFound(source, price, desc, link) {
        bot.sendMessage(telegramGroupId, this.getMessage(source, price, desc, link), this.textOptions);
    }

    send(text) {
        bot.sendMessage(telegramGroupId, text);
    }
};