const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

var customerSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: String,
      ref: "Photography",
    },
  ],
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

customerSchema
  .virtual("password")
  .set(function (password) {
    // creates temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuidv1();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

customerSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("Customer", customerSchema);
