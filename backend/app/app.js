const express = require('express');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');

const app = express();
// use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
const port = 3000;

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
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

async function sync() {
  await db.sequelize.sync({ foece: true });
}

sync().then((err) => console.log(err));

app.get('/', (_, res) => {
  res.send('Welcome to Uber Eats APIs. This is the homepage, please use proper path for respective APIs.');
});

app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(db.User);
});