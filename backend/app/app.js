const express = require('express');
const db = require('./models');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
const port = 3000;

async function sync() {
  await db.sequelize.sync({ foece: true });
}

sync().then((err) => console.log(err));

app.get('/', (_, res) => {
  res.send('Welcome to Uber Eats APIs. This is the homepage, please use proper path for respective APIs.');
});

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(db.User);
});
