const mongoose = require('mongoose');
const DB_NAME = 'wunderkammer_db';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.info(`***********************\nYeah! Connected to db ${DB_NAME}\nWUNDERKAMMER DATA BASE SERVER STARTED UP!!!!!\n***********************`);
    })
    .catch(error => {
        console.error(`WARNING!!!!!!!!!!!!!!!!!!!!!!\nOops... Unable to connect to db ${DB_NAME}: ${error}`);
    })