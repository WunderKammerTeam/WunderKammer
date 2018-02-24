const mongoose = require('mongoose');

// Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
//IMPORTANT: in production set MONOGO_URI to MOGOLABS_URL
const DB_NAME = process.env.MONGO_DB_NAME;
const MONGODB_URI = process.env.MONGO_MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
  .then(() => {
      console.info(
        `\n***********************
        \rWUNDERKAMMER DATA BASE SERVER STARTED UP!!!!!
        \rYeah, Mongo Rules! Connected to db ${DB_NAME}
        \r***********************`
      );
  })
  .catch(error => {
    console.error(
      `WARNING!!!!!!!!!!!!!!!!!!!!!!
      Oops... Unable to connect to db ${DB_NAME}: ${error}`
    );
});
