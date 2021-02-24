
const schedule = require('node-schedule');
const Prefs = require('../redis/prefs.js');

let mainJob;

const HOURS_START = 7;
const HOURS_END = 23;

module.exports = class Job {


    async buildPattern() {
        var pattern = '';
        var prefValue = await Prefs.huntsEvery();
        var time = prefValue.match(/\d+/g);

        if (prefValue.toLowerCase().includes('h')) pattern = '* */' + time;

        if (prefValue.toLowerCase().includes('m')) pattern = '*/' + time + ' *';

        pattern = pattern + ' * * *';

        const startTime = new Date()
        startTime.setHours(HOURS_START)
        startTime.setMinutes(0)

        const endTime = new Date();
        endTime.setHours(HOURS_END);
        endTime.setMinutes(0)

        var result = { start: startTime, end: endTime, rule: pattern };
        console.log(result);

        return result;
    }

    static async reschedule() {
        mainJob.reschedule(await new Job().buildPattern())
    }

    static now() {
        mainJob.invoke();
    }

    async bind(work, onTerminate) {
        mainJob = schedule.scheduleJob(await this.buildPattern(), work);
        if (onTerminate) onTerminate(this);
    }

}

