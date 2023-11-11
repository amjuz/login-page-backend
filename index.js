const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const path = require('path')
const port = 3004

app.use(express.static(__dirname));



app.get('/signup', (req, res) => {
    const signupPath = path.join(__dirname, 'signup.html')

    fs.readFile(signupPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('internal server error')
        } else {
            res.send(data)
        }

    })
});

app.post('/signup', (req,res) => {
    
})

app.get('/', (req, res) => {
    res.send(`hey there welcome to port ${port}`)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


