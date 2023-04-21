const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DataBase = process.env.DATABASE;

mongoose.connect(DataBase, { useNewUrlParser: true }).then((connection) => {
  console.log("Database connection successful!");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});




