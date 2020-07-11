const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.text({"type": "application/logplex-1"}))
app.get('/', (req, res) => res.send("HELLO WORLD!"));

app.post('/logs', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    res.setHeader("Content-Length", 0)
    return res.sendStatus(200);
})

app.listen((process.env.PORT || port), () => {
    console.log("listening....")
})