
if (global.phrases == undefined) {
    global.phrases = [];
}

module.exports = class Memories {

    put(text) {
        global.phrases.push(text)
    }

    has(text) {
        var hasit = global.phrases.some((e) => {
            return e == text;
        });

        if (hasit) {
            console.log('Already has: ' + text)
        }

        return hasit;
    }

}