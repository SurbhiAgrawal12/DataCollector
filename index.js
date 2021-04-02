//require('express-async-errors');
const error = require('./middleware/error');
const isUserAuthenticated = require('./middleware/auth');
const getBearerToken = require('./middleware/generateToken');
const express = require('express');
const app = express();
const sonarqubeController = require('./api/controllers/sonarqubeController');
const bodyParser = require('body-parser');
const config = require('config');


/* load the .env variable into process.env
*/
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const debug = require('debug')('app:startup');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//api/sast/
app.use('/api/sonarqube', [ getBearerToken, isUserAuthenticated], sonarqubeController);

// single place to handle the error
//app.use(error);

const port = !!(config.get('SERVER_PORT')) ? config.get('SERVER_PORT') : !!(process.env.SERVER_PORT) ? process.env.SERVER_PORT : 8080;
app.listen(port, () => {
  debug(`Application running on ${port}`);
  //console.log(`Application running on ${port}`);
});


