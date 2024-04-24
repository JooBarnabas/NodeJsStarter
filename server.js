const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');

const app = express();

dotenv.config();
const db = require("./app/models");
db.sequelize.sync().then(() => {
  console.log("Database syncronised...");
})
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.send('HALOOOOO');
});

require("./app/routes/users.routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});