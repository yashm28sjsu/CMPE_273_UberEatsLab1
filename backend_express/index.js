const express = require('express');
const kafka = require('./kafka/client');
const mongoose = require('mongoose');
const passport = require("passport");
const cors = require('cors');
const topics = require('./topics');
const { setupPassport, authenticateUser, authenticateRestaurant } = require('./middlewares/passport');
const dbconfig = require('./config/config.json');
const uploadFile = require('./middlewares/s3');
const { upload } = require('./middlewares/upload');

const app = express();
// use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(cors({ origin: 'http://3.135.61.25:3001', credentials: true }));
app.use(express.json());
const port = 3001;

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Origin', 'http://3.135.61.25:3001');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

setupPassport();
app.use(passport.initialize());

mongoose.connect(dbconfig.development.url).then(() => console.log("Database connected"));

const handleRequest = (topic, req, res) => {
  kafka.makeRequest(topic, req.body, (error, response) => {

    if (error) {
      res.send({ error });
    } else {
      res.send({ response });
    }

  });
};

app.get('/', (_, res) => {
  res.send('Welcome to Uber Eats APIs. This is the homepage, please use proper path for respective APIs.');
});

app.post('/user/create', (req, res) => handleRequest(topics.USER_CREATE, req, res));
app.post('/user/update', authenticateUser, (req, res) => handleRequest(topics.USER_UPDATE, req, res));
app.post('/user/login', (req, res) => handleRequest(topics.USER_LOGIN, req, res));

app.post('/restaurant/create', (req, res) => handleRequest(topics.RESTAURANT_CREATE, req, res));
app.post('/restaurant/update', authenticateRestaurant, (req, res) => handleRequest(topics.RESTAURANT_UPDATE, req, res));
app.post('/restaurant/getall', (req, res) => handleRequest(topics.RESTAURANT_GETALL, req, res));
app.post('/restaurant/login', (req, res) => handleRequest(topics.RESTAURANT_LOGIN, req, res));

app.post('/dish/create', authenticateRestaurant, (req, res) => handleRequest(topics.DISH_CREATE, req, res));
app.post('/dish/update', authenticateRestaurant, (req, res) => handleRequest(topics.DISH_UPDATE, req, res));
app.post('/restaurant/getdishes', authenticateRestaurant, (req, res) => handleRequest(topics.RESTAURANT_GETDISHES, req, res));
app.post('/user/getdishes', authenticateUser, (req, res) => handleRequest(topics.RESTAURANT_GETDISHES, req, res));

app.post('/order/create', authenticateUser, (req, res) => handleRequest(topics.ORDER_CREATE, req, res));
app.post('/order/updatestatus', authenticateRestaurant, (req, res) => handleRequest(topics.ORDER_UPDATESTATUS, req, res));
app.post('/user/getorders', authenticateUser, (req, res) => handleRequest(topics.USER_GETORDERS, req, res));
app.post('/restaurant/getorders', authenticateRestaurant, (req, res) => handleRequest(topics.RESTAURANT_GETORDERS, req, res));

app.post('/address/create', authenticateUser, (req, res) => handleRequest(topics.ADDRESS_CREATE, req, res));
app.post('/address/update', authenticateUser, (req, res) => handleRequest(topics.ADDRESS_UPDATE, req, res));
app.post('/user/getaddresses', authenticateUser, (req, res) => handleRequest(topics.USER_GETADDRESSES, req, res));

app.post('/favourite/create', authenticateUser, (req, res) => handleRequest(topics.FAVOURITE_CREATE, req, res));
app.post('/favourite/remove', authenticateUser, (req, res) => handleRequest(topics.FAVOURITE_REMOVE, req, res));
app.post('/user/getfavourites', authenticateUser, (req, res) => handleRequest(topics.USER_GETFAVOURITES, req, res));

app.post('/file/upload', [authenticateRestaurant, upload.single("file")], async (req, res) => {
  const file = req.file;

  if (file) {
    const uploadResult = await uploadFile(file);
    res.send({ url: uploadResult['Location'] });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
