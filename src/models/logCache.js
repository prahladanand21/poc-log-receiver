const parser = require('heroku-log-parser')
const moment = require('moment')

class LogCache {
    constructor () {
        this.cache = [];
    }

    /**
     * Add parsed log entry to cache
     * @param {Object} logEntry The parsed log entry
     */
    addLogEntry (logEntry) {
        this.cache.push(logEntry);
    }

    /**
     * Parse log message string from logplex and add to cache
     * @param {String} log The syslog message sent from logplex 
     */
    addLog (log) {
        const logEntries = parser.parse(log);
        logEntries.forEach(entry => {
            const record = {
                'timestamp': moment(entry['emitted_at']).valueOf(),
                'message': entry['message']
            };
            this.addLogEntry(record);
        })
    }

    /**
     * 
     * @param {String} curr_time 
     */
    getLogs(curr_time) {
        console.log(JSON.stringify(this.cache));
        const result = [];
        const start_time = curr_time - 60000;
        console.log(`curr_time: ${curr_time}`);
        console.log(`start_time: ${start_time}`);
        this.cache.forEach(log => {
            console.log(log['timestamp']);
            if (log['timestamp'] <= curr_time && log['timestamp'] >= start_time) {
                result.push(log);
            }
        });

        return result;
    }

    /**
     * Print contents of short-term cache
     */
    print() {
        console.log(JSON.stringify(this.cache, null, 4));
    }

    /**
     * Clear short term cache and move contents to long term store 
     */
    clear() {
        this.cache = [];
    }
}


module.exports = new LogCache();
