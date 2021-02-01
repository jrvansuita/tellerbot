const token = '1668037380:AAEVRY00NfsIA0bea_lD_ciT2wc9m4HylOI';

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const telegramGroupId = -549708490;


const Prefs = require('../prefs/prefs.js');

bot.onText(/\/bot (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1];
    var response = '';
    try {
        Object.keys(Prefs).forEach((key) => {
            if (message.startsWith(key)) {
                if (message.includes('on') || message.includes('off')) {
                    Prefs[key] = message.endsWith(' on');
                    response = '⚙️' + key + ' ads turned ' + (Prefs[key] ? 'ON!' : 'OFF!');
                }
            }
        });

        if (response) {
            bot.sendMessage(chatId, response);
        } else {
            bot.sendMessage(chatId, '🤖 sorry');
        }
    } catch (e) {
        console.log(e)
    }
});


bot.on('polling_error', (error) => {
    console.log(error.code); // => 'EFATAL'
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