const Prefs = require('../redis/prefs.js');


module.exports = (bot, msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1];

    var response = '';
    try {
        Object.keys(Prefs).forEach((key) => {
            if (message.startsWith(key)) {
                if (message.includes('on') || message.includes('off')) {
                    var isActive = message.endsWith(' on');

                    Prefs[key](isActive);

                    console.log(isActive)
                    response = '⚙️' + key + ' ads turned ' + (isActive ? 'ON!' : 'OFF!');
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
}