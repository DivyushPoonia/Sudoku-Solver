const express = require("express");
const app = express();
//const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');


const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: "This is secret", saveUninitialized: true, resave: true }))


app.listen("8000", (req, res) => {
    console.log("Listening to port 8000");
})

app.get('/', (req, res) => {
    res.render('sudoku.ejs');
})
