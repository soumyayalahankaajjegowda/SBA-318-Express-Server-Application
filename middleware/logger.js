//bringing moments
const moment = require('moment')



//calling simple middleware function

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.originalUrl}:${moment().format()}`);
    next();
}

module.exports = logger;