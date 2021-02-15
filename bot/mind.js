const Prefs = require('../redis/prefs.js');

/*
find - Search immediately by [item?].
hunt - Hunts immediately by active items.
schedule - Set the hunt schedule [Default 1h 30m].
pref - Activate or not the automatic hunt by item [item? on-off?].
pref_show - Show itens active or inactive preferences.
ignore_show - Show the ignore items list.
ignore_clear - Clear the ignore items list.
*/


module.exports = class Mind {
    constructor(bot) {
        this.bot = bot;
    }

    initialize() {
        this.bot.on('polling_error', (error) => {
            console.log(error.message); // => 'EFATAL'
            this.bot.sendMessage(error.message);
        });

        this.bot.on("callback_query", (data) => {
            if (data.data == "ignore-item") {
                Prefs.ignores(data.message.caption);
                this.bot.sendMessage(data.message.chat.id, '🚫 This item will never show up again!');
            }
        });
    }

    attach(command, callback) {
        this.bot.onText(command, async (msg, match) => {
            const chatId = msg.chat.id;
            const message = match[1];
            var response = await callback(message, this.bot, chatId) || '🤖 sorry';
            if (response) this.bot.sendMessage(chatId, response, { parse_mode: 'HTML' });
        });
    }

    create() {
        this.initialize();

        this.attach(/\/find (.+)/, (msg, bot, chatId) => {
            return find(msg, bot, chatId);
        })

        this.attach(/\/hunt/, hunt)

        this.attach(/\/schedule (.+)/, (msg) => {
            return schedule(msg);
        })

        this.attach(/\/pref (.+)/, (msg) => {
            return pref(msg);
        })
        this.attach(/\/pref_show/, prefShow)

        this.attach(/\/ignore_clear/, ignoreClear)
        this.attach(/\/ignore_show/, ignoreShow)
    }
}


function hunt() {
    global.job.now();
    return '⏳ Hunting goods now...';
}

function schedule(timing) {
    var value = timing;
    Prefs.huntsEvery(value);
    global.job.reschedule();
    return '⏰ Hunts schedule every ' + value;
}

function pref(value) {
    var response = '';
    Object.keys(Prefs.items).forEach((key) => {
        if (value.startsWith(key)) {
            if (value.includes('on') || value.includes('off')) {
                var isActive = value.endsWith(' on');
                Prefs.items[key](isActive);
                response = '⚙️' + key + ' ads turned ' + (isActive ? 'ON!' : 'OFF!');
            }
        }
    });

    return response;
}

function find(type, bot, chatId) {
    var response = '';

    Object.keys(Prefs.items).forEach((key) => {
        if (type == key) {
            global.executer.clear().put(key).skipPrefs(true).run(() => {
                setTimeout(() => {
                    bot.sendMessage(chatId, '✅ Search finished!');
                }, 1000);
            });

            response = '⏳ Searching now...';
        }
    });

    return response;
}

function ignoreClear() {
    Prefs.ignores(null, true);
    return '🧹 Ignore List Cleared';
}


async function ignoreShow() {
    return (await Prefs.ignores()).map((e) => { return '• ' + e }).join('\n');
}


async function prefShow() {
    var response = 'Preferences Items List:';

    var keys = Object.keys(Prefs.items);

    for (let index = 0; index < keys.length; index++) {
        var active = await Prefs.items[keys[index]]();
        response += '\n• ' + keys[index] + ' <b>' + active + '</b>';
    }

    return response;
}


