const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const Customer = require("../models/customer");

exports.customerApiCheck = (req, res, next) => {
  res.send("Api customer running");
};

exports.customerSignup = async (req, res) => {
  const customerExists = await Customer.findOne({
    email: req.body.email,
  });
  if (customerExists)
    return res.status(403).json({
      error: "Email is taken. User already registered.",
    });
  const customer = await new Customer(req.body);
  await customer.save();
  res.status(200).json({ message: "User Signup Successful! Please login." });
};
