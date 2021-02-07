const Prefs = require('../redis/prefs.js');

module.exports = (bot, msg, match) => {
    try {

        const chatId = msg.chat.id;
        const message = match[1];

        console.log(message);

        var response = checkGearTypesOnOff(message);
        var response = response || checkHuntClockChange(message);
        var response = response || checkHuntNow(message);
        var response = response || checkGearTypesUnitarySearches(message);


        if (response) {
            bot.sendMessage(chatId, response);
        } else {
            bot.sendMessage(chatId, '🤖 sorry');
        }
    } catch (e) {
        console.log(e)
    }
}

function checkHuntNow(requestMessage) {
    var keys = ['hunt now', 'search now', 'now'];
    if (keys.some((e) => { return e == requestMessage.toLowerCase() })) {
        global.job.now();
        return '⏳ Searching now...';
    }
}

function checkHuntClockChange(requestMessage) {
    var key = 'hunt every ';
    if (requestMessage.includes(key)) {
        var value = requestMessage.replace(key, '');
        Prefs.huntsEvery(value);
        global.job.reschedule();
        return '⏰ Hunts schedule every ' + value;
    }
}

function checkGearTypesOnOff(requestMessage) {
    var response = '';
    Object.keys(Prefs).forEach((key) => {
        if (requestMessage.startsWith(key)) {
            if (requestMessage.includes('on') || requestMessage.includes('off')) {
                var isActive = requestMessage.endsWith(' on');
                Prefs[key](isActive);
                response = '⚙️' + key + ' ads turned ' + (isActive ? 'ON!' : 'OFF!');
            }
        }
    });

    return response;
}

function checkGearTypesUnitarySearches(requestMessage) {
    var response = '';
    var keys = ['hunt', 'search', 'find', 'give'];
    if (keys.some((e) => { return requestMessage.toLowerCase().startsWith(e) })) {
        Object.keys(Prefs).forEach((key) => {
            if (requestMessage.includes(key)) {
                global.executer.clear().put(key).skipPrefs(true).run();
                response = '⏳ Searching now...';
            }
        });
    }

    return response;

}