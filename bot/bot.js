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
        this.textOptions = { parse_mode: 'HTML', disable_web_page_preview: true, allow_sending_without_reply: true }
    }

    getMessage(source, item) {
        //return this.newItemPrefix + ' no ' + source + ' por __' + item.price + '__:\n[' + item.title + '](' + item.link + ')\n ';
        return '<a href="' + item.link + '">' + item.title + ' no ' + source + ' por <b>' + item.price + '</b></a>';
    }

    newItemFound(source, item) {
        var reply = { text: 'teste' }
        bot.sendPhoto(telegramGroupId, item.link, { ...this.textOptions, caption: this.getMessage(source, item), reply_markup: reply });
        //bot.sendMessage(telegramGroupId, this.getMessage(source, item), this.textOptions);
    }
};