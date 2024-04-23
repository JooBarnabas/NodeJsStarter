const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const {Users} = require('./models/usersModel');
const sequelize = require('./db')

dotenv.config();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

sequelize.authenticate().then(() => {
    console.log('Connected');
})
.catch((error) => {
    console.log(error)
})


app.get('/', async(req, res) => {
//   res.send('Server is running')
  const users = await Users.findAll();
console.log(users.every(user => user instanceof Users)); // true
console.log('All users:', JSON.stringify(users, null, 2));

res.send(JSON.stringify(users, null, 2))
});

app.listen(process.env.PORT, () =>  console.log('Server is running'));