const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const connectDb = require("./src/connection/database");
const dotenv = require("dotenv");
const { logger } = require("./src/helpers/logger");
const cors = require("cors");
const { TaskQueue, setupWebhook} = require("./src/utils/rabbitMQ")

const user = require("./src/routes/user");
const task = require("./src/routes/task");
const subscribe = require("./src/routes/subscribe.js");


dotenv.config({ path: "config.env" });

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  // eslint-disable-next-line no-console
  console.log(err);
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(cors());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
  next();
});

app.use("/api/user/", user);
app.use("/api/task/", task);
app.use("/webhook/", subscribe);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));

const port = process.env.PORT || 3128;

let server;

  connectDb()
  .then(() => {
    server = app.listen(port, () => {
      logger.info(`################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

  TaskQueue().then(() => {
    logger.info(`🛡️  Task Queue setup 🛡️`);
  }).catch((err) => {
    console.log("connection failed", err);
  })

  setupWebhook().then(() => {
    logger.info(`🛡️  setup webhook 🛡️`);
  }).catch((err) => {
    console.log("connection failed", err);
  })

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
