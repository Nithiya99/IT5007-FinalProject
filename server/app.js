const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
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
const businessRoutes = require("./routes/business");
const serviceRoutes = require("./routes/service");

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/api/business", businessRoutes);
app.use("/api/service", serviceRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`A Node JS API is listening on port: ${port}`);
});
