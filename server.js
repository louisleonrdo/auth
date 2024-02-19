const express = require('express');
const app = express();
const path = require('path');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));

// ROUTES

app.get("/", (req, res) => res.send("Hello World"));

app.listen(PORT, () => {
    console.log("successfully hosted at http:/localhost:" + PORT);
})