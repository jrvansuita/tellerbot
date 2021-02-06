const schedule = require('node-schedule');
const Prefs = require('../redis/prefs.js');

let mainJob;

module.exports = class Job {

    async fromPrefs() {
        var defualt = { hour: 1, minute: 30 };

        var prefValue = await Prefs.huntsEvery();
        var time = prefValue.match(/\d+/g);

        if (prefValue.toLowerCase().includes('h')) defualt.hour = time;

        if (prefValue.toLowerCase().includes('m')) defualt.minute = time

        return defualt;
    }

    buildPattern(timing) {
        var time = '*/m */h * * *'.replace('m', timing.minute).replace('h', timing.hour);
        console.log(time);
        return time;
    }

    static async reschedule() {
        var job = new Job();
        var timing = await job.fromPrefs();
        mainJob.reschedule(job.buildPattern(timing))
    }

    static now() {
        mainJob.invoke();
    }

    async bind(work, onTerminate) {
        var timing = await this.fromPrefs();
        mainJob = schedule.scheduleJob(this.buildPattern(timing), work);
        if (onTerminate) onTerminate(this);
    }

}

