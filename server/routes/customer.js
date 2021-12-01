const express = require("express");
const {
  customerApiCheck,
  customerSignup,
  customerSignin,
  customerSignout,
  customerById,
  getCustomer,
  addToCart,
} = require("../controllers/customer");
const bodyParser = require("body-parser");
const { customerSignupValidator } = require("../validator");

const router = express.Router();
router.use(bodyParser.json());

router.get("/check", customerApiCheck);
router.post("/signup", customerSignupValidator, customerSignup);
router.post("/signin", customerSignin);
router.get("/:customerId", getCustomer);
router.get("/signout", customerSignout);
router.post("/addToCart", addToCart);

router.param("customerId", customerById);

module.exports = router;
