const parser = require('heroku-log-parser')
class LogCache {
    constructor () {
        this.cache = []
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
        console.log(`Adding log ${log}`);
        const logEntries = parser.parse(log);
        console.log(`Parsed log: ${JSON.stringify(logEntry)}`)
        logEntries.forEach(entry => {
            this.addLogEntry(entry);
        })
    }

    print() {
        console.log(JSON.stringify(this.cache, null, 4));
    }

    clear() {
        this.cache = []
    }

}


module.exports = new LogCache();