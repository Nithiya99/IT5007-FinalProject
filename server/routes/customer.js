const express = require("express");
const { customerApiCheck, customerSignup } = require("../controllers/customer");
const bodyParser = require("body-parser");
const { customerSignupValidator } = require("../validator");

const router = express.Router();
router.use(bodyParser.json());

router.get("/check", customerApiCheck);
router.post("/signup", customerSignupValidator, customerSignup);

module.exports = router;
