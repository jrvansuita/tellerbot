const schedule = require('node-schedule');
const Prefs = require('../redis/prefs.js');

let mainJob;

module.exports = class Job {


    async buildPattern() {
        var result = '';
        var prefValue = await Prefs.huntsEvery();
        var time = prefValue.match(/\d+/g);

        if (prefValue.toLowerCase().includes('h')) result = '* */' + time;

        if (prefValue.toLowerCase().includes('m')) result = '*/' + time + ' *';

        result = result + ' * * *';

        //console.log(result)
        return result;
    }

    static async reschedule() {
        mainJob.reschedule(await new Job().buildPattern())

        //console.log(mainJob.nextInvocation())
    }

    static now() {
        mainJob.invoke();
    }

    async bind(work, onTerminate) {
        mainJob = schedule.scheduleJob(await this.buildPattern(), work);
        if (onTerminate) onTerminate(this);
    }

}

