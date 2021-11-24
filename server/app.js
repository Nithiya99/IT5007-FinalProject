const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!!!");
  });

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection error: ${err.message}`);
});

// bring in routes
app.get("/", (req, res, next) => {
  res.send("Api running");
});

// middleware

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`A Node JS API is listening on port: ${port}`);
});
