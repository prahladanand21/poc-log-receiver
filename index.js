const express = require('express');
const bodyParser = require('body-parser');
const logCache = require('./src/models/logCache')
const app = express()
const port = 3000

app.use(bodyParser.text({"type": "application/logplex-1"}))
app.get('/', (req, res) => res.send("HELLO WORLD!"));

function getLogsPerMinute() {
    const logs = logCache.getLogs()
    console.log("Number of logs in last minute: " + logs.length);
    console.log(`Average Request Rate: ${logs.length / 60} logs/sec`);
    logCache.clear();
}

app.post('/logs', (req, res) => {
    console.log(req.body);
    logCache.addLog(req.body);
    res.setHeader("Content-Length", 0)
    return res.sendStatus(200);
})


app.listen((process.env.PORT || port), () => {
    console.log("listening....")
    setInterval(getLogsPerMinute, 60000);
})