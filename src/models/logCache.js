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
        console.log(`Added logEntry: ${JSON.stringify(logEntry)}`);
        console.log(JSON.stringify(this.cache) + "-----cache")
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
    getLogs() {
        const currentTime = moment.utc()
        const startTime = currentTime - 60000;

        
        console.log(JSON.stringify(this.cache));
        console.log(`curr_time: ${currentTime}`);
        console.log(`start_time: ${startTime}`);

        const result = [];
        this.cache.forEach(log => {
            console.log(log['timestamp']);
            if (log['timestamp'] <= currentTime && log['timestamp'] >= startTime) {
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
