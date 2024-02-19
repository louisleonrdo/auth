const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.urlencoded({extended: true}));

// ROUTES
app.get("/", async (req, res) => {
    res.redirect('login');
});


app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
    

})


app.listen(PORT, () => {
    console.log("successfully hosted at http:/localhost:" + PORT);
})