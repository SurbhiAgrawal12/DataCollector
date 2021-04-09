//require('express-async-errors');
const error = require('./middleware/error');
//const isUserAuthenticated = require('./middleware/auth');
//const getBearerToken = require('./middleware/generateToken');
const express = require('express');
const app = express();
const sastController = require('./api/controllers/sastController');
const bodyParser = require('body-parser');
const config = require('config');
const Db = require('./database');
const db = new Db();


/* load the .env variable into process.env
*/
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const debug = require('debug')('app:startup');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  //  parses body of the request

//app.use('/api/sast/', [ getBearerToken, isUserAuthenticated], sonarqubeController);
app.use('/api/sast', sastController);

// single place to handle the error
//app.use(error);

const port = !!(config.get('SERVER_PORT')) ? config.get('SERVER_PORT') : !!(process.env.SERVER_PORT) ? process.env.SERVER_PORT : 8080;
app.listen(port, () => {
  // (async () => { await db.connectToDatabase(); })();
  //debug(`Application running on ${port}`);
  console.log(`Application running on ${port}`);
});


