module.exports = class Memories {
    constructor() {
        this.phrases = [];
    }


    put(text) {
        this.phrases.push(text)
    }

    has(text) {
        var hasit = this.phrases.some((e) => {
            return e == text;
        });

        if (hasit) {
            console.log('Already has: ' + text)
        }

        return hasit;
    }

}