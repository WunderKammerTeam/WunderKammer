const mongoose = require('mongoose');
const DB_NAME = 'wunderkammer_db';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;

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
