const express = require('express');
const bodyParser = require('body-parser');
const logCache = require('./src/models/logCache');
const moment = require('moment');
const config = require('./config');
const request = require('superagent');
const fs = require('fs')

const port = 3000;
const app = express();

app.use(bodyParser.text({ type: 'application/logplex-1' }));
app.get('/', (req, res) => res.send('HELLO WORLD!'));

function getLogsPerMinute() {
    const logs = logCache.getLogs();
    const metrics = logCache.getMetrics(logs);
    console.log(`Timestamp: ${moment.utc()}`);
    console.log('Number of logs in last minute: ' + logs.length);
    console.log(`Average Request Rate: ${logs.length / 60} logs/sec`);

    const key = fs.readFileSync('key.txt');
    const cert = fs.readFileSync('cert-chain.pem');
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    request.post(config.ajnaURL)
    .key(key)
    .cert(cert)
    .set('Content-Type', 'application/json')
    .send(metrics)
    .then((res) => {
        console.log('Metrics sent successfully');
        console.log(JSON.stringify(res.body));
    })
    .catch((err) => {
        console.error(err);
    });

        
    logCache.clear();
}

app.post('/logs', (req, res) => {
    console.log(req.body);
    logCache.addLog(req.body);
    res.setHeader('Content-Length', 0);
    return res.sendStatus(200);
});

app.listen(process.env.PORT || port, () => {
    console.log('listening....');
    // Putting this inside listen to avoid loss of logs during start up
    setInterval(getLogsPerMinute, 60000);
});
