const express = require("express");
const {
  businessSignup,
  businessApiCheck,
  businessSignin,
  businessSignout,
  businessById,
} = require("../controllers/business");
const { businessSignupValidator } = require("../validator/index");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

router.get("/check", businessApiCheck);
router.post("/signup", businessSignupValidator, businessSignup);
router.post("/signin", businessSignin);
router.get("/signout", businessSignout);

// any route containing: businessId, our app will first excute businesById()
router.param("businessId", businessById);

module.exports = router;
