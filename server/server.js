const chalk = require("chalk");
const express = require("express");
const dotenv  = require('dotenv')
const { handleError } = require("./utils/handleErrors");
const app = express();
const cors = require('cors')
const router = require("./router/router");
const logger = require("./logger/loggerService");
const connectToDb = require("./DB/dbService");
const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");
dotenv.config()
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = process.env.PORT || 8181;
console.log(process.env.NODE_ENV);

app.listen(PORT, async () => {
  try {
    console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
    connectToDb();
    let id = await generateInitialUsers();
    generateInitialCards(id);
  } catch (err) {
    console.log(chalk.redBright(err));
  }
});