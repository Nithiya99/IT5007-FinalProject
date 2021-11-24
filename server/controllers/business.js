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

exports.businessSignin = (req, res) => {
  // Find the business based on Business Email
  const { businessEmail, password } = req.body;
  Business.findOne({ businessEmail }, (err, business) => {
    // if err of no business
    if (err || !business) {
      return res.status(401).json({
        error: "Business with that email does not exist. Please signup.",
      });
    }
    // if business is found, make sure the email and password match
    // create authenticate model and use here
    if (!business.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match.",
      });
    }
    // generate a token with business id and secret
    const businessToken = jwt.sign(
      { _id: business._id },
      process.env.JWT_SECRET
    );
    // persist the token as 't' in cookie with expiry date
    res.cookie("b", businessToken, { expire: new Date() + 9999 });
    // return response with business and token to front end
    const { _id, businessName, businessEmail } = business;
    return res.json({
      businessToken,
      business: { _id, businessName, businessEmail },
    });
  });
};

exports.businessById = (req, res, next, id) => {
  Business.findById(id).exec((err, business) => {
    if (err || !business) {
      return res.status(400).json({
        error: "Business not found",
      });
    }
    req.businessProfile = business;
    next();
  });
};

exports.businessSignout = (req, res) => {
  res.clearCookie("b");
  return res.json({ message: "Signout Success!" });
};
