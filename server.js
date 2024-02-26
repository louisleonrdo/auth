require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const time = require('./utils/time');
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const { loginAttempt } = require('./utils/loginAttempt');
// const { fail } = require('assert');

// CONFIGURATION
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// ROUTES
app.get("/", (req, res) => {
    // const datetime = time.getUTCDatetime();
    res.send(req.headers);
});


app.get('/login', auth.authenticated, (req, res) => res.render('login'));
app.get('/dashboard', auth.authorization , (req, res) => res.render('dashboard'));

app.post('/login',  async (req, res) => {
    const { username, password } = req.body;

    try {
        let [result] = await userModel.findUserByUsername(username);
        
        if(!result.length){
            res.send('username not found');
            return;
        }

        const isMatch = await bcrypt.compare(password, result[0].password);
        
        if(!isMatch) {
            loginAttempt(req, res, username);
            return;
        }

        const sessionId = await bcrypt.hash(username, 10);
                
        const data = {
            sid: sessionId,
            user_id: result[0].user_id,
        }
        userModel.saveUserSession(data);
        
        res.cookie('sid', sessionId, { maxAge: 900000, httpOnly: true, }).redirect('dashboard');    
    }catch(err){
        res.send(err);
    }
    
})


app.listen(PORT, () => {
    console.log("successfully hosted at http:/localhost:" + PORT);
})