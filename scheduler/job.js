const Util = require('../util/util.js');
const schedule = require('node-schedule');
const Prefs = require('../redis/prefs.js');

var mainJob;

//const HOURS_START = 7;
////const HOURS_END = 23;  

module.exports = class Job {


    async buildPattern() {
        var pattern = '';
        var prefValue = await Prefs.huntsEvery();
        var time = prefValue.match(/\d+/g);

        if (prefValue.toLowerCase().includes('h')) pattern = '* */' + time;

        if (prefValue.toLowerCase().includes('m')) pattern = '*/' + time + ' *';

        pattern = pattern + ' * * *';


        // var result = { start: Util.date(HOURS_START), end: Util.date(HOURS_END), rule: pattern };
        // console.log(result);

        // return result;
        return pattern;
    }

    static async reschedule() {
        mainJob.reschedule(await new Job().buildPattern())
    }

    static now() {
        if (mainJob) {
            mainJob.invoke();
        }
    }

    async bind(work, onTerminate) {
        mainJob = schedule.scheduleJob(await this.buildPattern(), work);
        if (onTerminate) onTerminate(this);
    }

}

