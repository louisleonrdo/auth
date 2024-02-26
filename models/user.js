const connection = require('../utils/database');

const getAllUser = () => {
    return connection.execute("SELECT * FROM users");
}

const findUserByUsername = (username) => {
    return connection.execute("SELECT * FROM users WHERE username = ?", [username]);
}

const findUserByEmail = (email) => {
    return connection.execute("SELECT * FROM users WHERE email = ?", [email]);
}

const saveUserSession = (data) => {
    return connection.execute("INSERT INTO `user_login_data` (`sid`, `user_id`, `created_at`, `expired_at`) VALUES (?, ?, UTC_TIMESTAMP(), DATE_ADD(UTC_TIMESTAMP, INTERVAL 1 DAY))", [data.sid, data.user_id]);
}

const isLoggedIn = (sid) => {
    return connection.execute("SELECT user_id FROM `loggedinuser` WHERE sid = ?", [sid]);
}

module.exports = {
    getAllUser,
    findUserByUsername,
    findUserByEmail,
    saveUserSession,
    isLoggedIn
}