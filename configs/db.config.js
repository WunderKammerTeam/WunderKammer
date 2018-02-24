const mongoose = require('mongoose');

// Rquire Environment Variables ----> IMPORTANT: remeber to add the .env file to GitIgnore!!!
require("dotenv").config();
const DB_NAME = process.env.MONGO_DB_NAME;
const MONGODB_URI = process.env.MONGO_MONGODB_URI || `mongodb://localhost/${process.env.MONGO_DB_NAME}`;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI)
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
