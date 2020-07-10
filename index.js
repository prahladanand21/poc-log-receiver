const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => res.send("HELLO WORLD!"));

app.post('/logs', (req, res) => {
    console.log(JSON.stringify(req.body))
})

app.listen((process.env.PORT || port), () => {
    console.log("listening....")
})