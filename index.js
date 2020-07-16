const express = require('express');
const bodyParser = require('body-parser');
const logCache = require('./src/models/logCache')
const app = express()
const port = 3000

const logs = []

app.use(bodyParser.text({"type": "application/logplex-1"}))
app.get('/', (req, res) => res.send("HELLO WORLD!"));

function getLogsPerMinute() {
    logs.push(...logCache.cache);
    console.log("Number of logs in last minute: " + logCache.cache.length);
    console.log("Total Number of logs: " + logs.length);
    logCache.clear();
}

setInterval(getLogsPerMinute, 60000);

app.post('/logs', (req, res) => {
    console.log(req.body);
    logCache.addLog(req.body);
    logCache.print();
    res.setHeader("Content-Length", 0)
    return res.sendStatus(200);
})


app.listen((process.env.PORT || port), () => {
    console.log("listening....")
})