const parser = require('heroku-log-parser')
class LogCache {
    constructor () {
        this.cache = [];
        this.store = [];
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
            this.addLogEntry(entry);
        })
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
        this.store.push(...this.cache);
        this.cache = [];
    }
}


module.exports = new LogCache();
