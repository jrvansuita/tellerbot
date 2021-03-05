module.exports = class Memories {
    constructor() {
        this.phrases = [];
    }


    put(text) {
        this.phrases.push(text)
    }

    has(text) {
        return this.phrases.some((e) => {
            return e == text;
        });
    }

}