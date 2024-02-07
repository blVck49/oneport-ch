const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@temp-cluster.jiz6a.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  await mongoose
    .connect(uri, {})
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = connectDB;
