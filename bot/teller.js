const TelegramBot = require('node-telegram-bot-api');
const token = '1668037380:AAEVRY00NfsIA0bea_lD_ciT2wc9m4HylOI';
const telegramGroupId = -549708490;

module.exports = class TellerBot {


    constructor() {
        this.bot = new TelegramBot(token, { polling: false });
        this.newItemPrefix = '\n👉 Novo Item encontrado';
        this.textOptions = { parse_mode: 'Markdown' }
    }

    getMessage(source, item) {
        return this.newItemPrefix + ' no ' + source + ' por __' + item.price + '__:\n[' + item.title + '](' + item.link + ')\n ';
    }

    newItemFound(source, price, desc, link) {
        this.bot.sendMessage(telegramGroupId, this.getMessage(source, price, desc, link), this.textOptions);
    }


    send(text) {
        this.bot.sendMessage(telegramGroupId, text);
    }


};