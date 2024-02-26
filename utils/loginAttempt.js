const loginAttempt = (req, res, username) => {
    let failedLoginAttempt = req.session.loginAttemptSession;

    if(!failedLoginAttempt)
        failedLoginAttempt = new Map();
    else
        failedLoginAttempt = new Map(Object.entries(JSON.parse(failedLoginAttempt)));

    
    if(!failedLoginAttempt.size){
        failedLoginAttempt.set(username, 1);
    }else{
        if(failedLoginAttempt.has(username))
            failedLoginAttempt.set(username, failedLoginAttempt.get(username) + 1);
        else
            failedLoginAttempt.set(username, 1);
    }

    req.session.loginAttemptSession = JSON.stringify(Object.fromEntries(failedLoginAttempt));
    console.log(failedLoginAttempt);
    res.send("password is not verified");    

}

module.exports = {loginAttempt}