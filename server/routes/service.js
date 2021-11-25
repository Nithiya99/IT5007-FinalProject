const express = require("express");
const {
  photographyServiceCheck,
  createPhotographySevice,
  photographyByBusiness,
  getAllPhotography,
} = require("../controllers/photography");
const {
  requireBusinessSignin,
  businessById,
} = require("../controllers/business");
const { createPhotographyServiceValidator } = require("../validator/index");

const router = express.Router();

// Photography Service Routes
router.get("/photography/check", photographyServiceCheck);
router.get("/photography/all", getAllPhotography);
router.get(
  "/photography/by/:businessId",
  requireBusinessSignin,
  photographyByBusiness
);
router.post(
  "/photography/new/:businessId",
  requireBusinessSignin,
  createPhotographySevice,
  createPhotographyServiceValidator
);

// any route containing: businessId, our app will first excute businesById()
router.param("businessId", businessById);

module.exports = router;
