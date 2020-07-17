const express = require('express');
const bodyParser = require('body-parser');
const logCache = require('./src/models/logCache')
const app = express()
const port = 3000


app.use(bodyParser.text({"type": "application/logplex-1"}))
app.get('/', (req, res) => res.send("HELLO WORLD!"));

function getLogsPerMinute() {
    console.log("Number of logs in last minute: " + logCache.cache.length);
    logCache.clear();
    console.log("Total Number of logs: " + logCache.store.length);
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