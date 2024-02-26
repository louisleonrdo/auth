const userModel = require('../models/user');

const authorization = async (req, res, next) => {
    try {

        if(!req.cookies.sid){
            res.redirect('login');
            return;
        }

        const [ result ] = await userModel.isLoggedIn(req.cookies.sid);
        console.log(result);

        if(!result.length){
            res.redirect('login');
            return;
        }
            
    }catch(err){
        res.status(501).redirect('error_page');
    }


    next();
}

const authenticated = async (req, res, next) => {
    try {
        if(!req.cookies.sid){
            next();
            return;
        }

        const [ result ] = await userModel.isLoggedIn(req.cookies.sid);
        console.log(result);

        if(!result.length){
            next();
        }else{
            res.redirect('dashboard');
            return;
        }
            
    }catch(err){
        res.status(501).redirect('error_page');
    }




}

module.exports = {
    authorization,
    authenticated
}