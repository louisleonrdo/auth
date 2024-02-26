
function getUTCDatetime(){
    const time = new Date();
    
    return time.toISOString().replace('T', ' ').slice(0, 19);
}

module.exports = {
    getUTCDatetime
}