const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const Business = require("../models/business");

exports.businessApiCheck = (req, res, next) => {
  res.send("Api Business running");
};

exports.businessSignup = async (req, res) => {
  const businessExisits = await Business.findOne({
    businessEmail: req.body.businessEmail,
  });
  if (businessExisits)
    return res.status(403).json({
      error: "Email is taken. Merchant already registered.",
    });
  const business = await new Business(req.body);
  await business.save();
  res
    .status(200)
    .json({ message: "Business Registration Successful! Please login." });
};
