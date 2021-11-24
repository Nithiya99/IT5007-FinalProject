exports.businessSignupValidator = (req, res, next) => {
  // Business Name is not null
  req.check("businessName", "Business Name is required").notEmpty();
  // Business email is not null and valid
  req
    .check("businessEmail", "Please enter a valid email")
    .matches(/.\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });
  req.check("password", "Please enter a password").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  //   Check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
