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

exports.customerSignin = (req, res) => {
  // Find customer based on email
  const { email, password } = req.body;
  Customer.findOne({ email }, (err, customer) => {
    if (err | !customer) {
      return res.status(401).json({
        error: "Customer with that email does not exist. Please Signup.",
      });
    }
    // if customer found, make sure the email and password match
    // create authenticate model and use here
    if (!customer.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match.",
      });
    }
    // generate a token with business id and secret
    const customerToken = jwt.sign(
      { _id: customer._id },
      process.env.JWT_SECRET
    );
    // persist the token as 'c' in cookie with expiry date
    res.cookie("c", customerToken, { expire: new Date() + 9999 });
    // return response with customer and token to frontend
    const { _id, username, email } = customer;
    return res.json({ customerToken, customer: { _id, username, email } });
  });
};

exports.customerById = (req, res, next, id) => {
  Customer.findById(id).exec((err, customer) => {
    if (err || !customer) {
      return res.status(400).json({
        error: "Customer not found",
      });
    }
    req.customerProfile = customer;
    next();
  });
};

exports.getCustomer = (req, res) => {
  // We do not want to return the password to the front end
  req.customerProfile.hashed_password = undefined;
  req.customerProfile.salt = undefined;
  return res.json(req.customerProfile);
};

exports.addToCart = (req, res) => {
  let customerId = req.body.customerId;
  let productId = req.body.productId;
  Customer.findOne({ customerId }, (err, customer) => {
    if (err | !customer) {
      return res.status(401).json({
        error: "Something went wrong.",
      });
    } else {
      if (customer) {
        let inCart = false;
        customer.cart.forEach(function (item) {
          if (item == productId) {
            inCart = true;
            return res.status(401).json({
              error: "Item already in cart",
            });
          }
        });
        if (!inCart) {
          // Not working
          customer.cart.push(productId);
          return res.status(200).json({
            message: "Item added successfully to cart",
          });
        }
      }
    }
  });
};

exports.customerSignout = (req, res, err) => {
  res.clearCookie("c");
  return res.json({ message: "Signout Success" });
};
