const express = require("express");
const { businessSignup, businessApiCheck } = require("../controllers/business");
const { businessSignupValidator } = require("../validator/index");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

router.post("/signup", businessSignupValidator, businessSignup);
router.get("/check", businessApiCheck);

module.exports = router;
