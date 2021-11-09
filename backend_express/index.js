const express = require('express');
const cors = require('cors');
const kafka = require('./kafka/client');
const topics = require('./topics');

const app = express();
// use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
// app.use(cors({ origin: 'http://3.135.61.25:3001', credentials: true }));
app.use(express.json());
const port = 3000;

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
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
app.post('/user/update', (req, res) => handleRequest(topics.USER_UPDATE, req, res));
app.post('/user/login', (req, res) => handleRequest(topics.USER_LOGIN, req, res));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
