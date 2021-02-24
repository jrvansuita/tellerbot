module.exports = {
    sleep: (ms) => {
        var start = new Date().getTime(), expire = start + ms;
        while (new Date().getTime() < expire) { }
        return;
    },

    date: (hours) => {
        var now = new Date();
        return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hours, 0, 0));

    }
}