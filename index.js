const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

var logs = []
var cache = []

app.use(bodyParser.text({"type": "application/logplex-1"}))
app.get('/', (req, res) => res.send("HELLO WORLD!"));

function getLogsPerMinute() {
    logs.push(...cache);
    console.log("Number of logs in last minute: " + cache.length);
    console.log("Total Number of logs: " + logs.length);
    cache = [];
}

setInterval(getLogsPerMinute, 60000);

app.post('/logs', (req, res) => {
    console.log(req.body);
    const currLogs = req.body.split('\n');
    cache.push(...currLogs);
    res.setHeader("Content-Length", 0)
    return res.sendStatus(200);
})


app.listen((process.env.PORT || port), () => {
    console.log("listening....")
})