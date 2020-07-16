const parse = require('syslog-parse')
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
        const logEntry = parse(log);
        console.log(`Parsed log: ${JSON.stringify(logEntry)}`)
        this.addLogEntry(logEntry)
    }

    print() {
        console.log(JSON.stringify(this.cache, null, 4));
    }

}


module.exports = new LogCache();