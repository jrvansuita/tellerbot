const token = '1668037380:AAEVRY00NfsIA0bea_lD_ciT2wc9m4HylOI';

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: true });

const telegramGroupId = -549708490;

const BotMind = require('./mind.js');


new BotMind(bot).create();



module.exports = class TellerBot {

    constructor() {
        this.textOptions = { parse_mode: 'HTML', disable_web_page_preview: true, allow_sending_without_reply: true }
    }

    getMessage(source, item) {
        return '<a href="' + item.link + '">' + item.title + ' no ' + source + ' por <b>' + item.price + '</b></a>';
    }

    newItemFound(source, item) {
        var options = {
            caption: this.getMessage(source, item),
            ...this.textOptions,
            reply_markup: {
                inline_keyboard: [
                    [{ text: ' Acessar', url: item.link }, { text: ' Ignorar', callback_data: 'ignore-item' }]
                ]
            }
        };

        bot.sendPhoto(telegramGroupId, item.link, options);
    }

    searchTerminated() {
        bot.sendMessage(telegramGroupId, '✅ Search Done!');
    }

};