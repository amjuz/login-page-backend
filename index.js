const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const path = require('path')
const port = 3004

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));


const USERS = []

app.get('/login', (req, res) => {
    const loginPath = (path.join(__dirname, 'login.html'))
    res.sendFile(loginPath)
})
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        const user = USERS.find(e => e.email === email && e.password === password)

        if (user) {
            res.sendFile(path.join(__dirname, 'welcome.html'))
        } else {
            res.status(401).send('user not registered! Please signup')
        }
    } else {
        res.status(400).send('invalid email and password')

    }
})
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

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        const user = {
            email: email,
            password: password
        }
        USERS.push(user)
        console.log(`heyy this is your email: ${email} , and password: ${password} `)
        res.redirect('/login')
    } else {
        res.status(400).send('invalid email or pass')
    }
})

app.get('/', (req, res) => {
    res.send(`hey there welcome to port ${port}`)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


