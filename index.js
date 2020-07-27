const express = require('express');
const bodyParser = require('body-parser');
const logCache = require('./src/models/logCache')
const app = express()
const port = 3000
const date = Date()

app.use(bodyParser.text({"type": "application/logplex-1"}))
app.get('/', (req, res) => res.send("HELLO WORLD!"));

function getLogsPerMinute() {
    const curr_time = date.getTime();
    const logs = logCache.getLogs(curr_time)
    console.log("Number of logs in last minute: " + logs.length);
    logCache.clear();
}

setInterval(getLogsPerMinute, 60000);

app.post('/logs', (req, res) => {
    console.log(req.body);
    logCache.addLog(req.body);
    res.setHeader("Content-Length", 0)
    return res.sendStatus(200);
})


app.listen((process.env.PORT || port), () => {
    console.log("listening....")
})