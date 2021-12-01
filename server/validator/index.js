exports.businessSignupValidator = (req, res, next) => {
  // Business Name is not null
  req.check("businessName", "Business Name is required").notEmpty();
  // Business email is not null and valid
  req
    .check("businessEmail", "Please enter a valid email")
    .matches(/.\@.+\..+/)
    .withMessage("Email must contain domain (e.g. @gmail.com)")
    .isLength({
      min: 4,
      max: 2000,
    });
  req
    .check("businessHp", "Please provide your 8 digits business contact number")
    .isLength({
      min: 8,
      max: 8,
    });
  req
    .check("businessAddress", "Please provide your full business address")
    .isLength({
      min: 6,
      max: 500,
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

exports.createPhotographyServiceValidator = (req, res, next) => {
  // title
  req.check("title", "Give a name for your service").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });
  // description
  req.check("description", "Write a description").notEmpty();
  req
    .check("description", "Description must be between 4 to 2000 characters")
    .isLength({
      min: 4,
      max: 500,
    });
  // Imagw
  req.check("image", "Please add an image of your service").notEmpty();
  // Price
  req.check("price", "Provide the price for your service").notEmpty();
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

exports.customerSignupValidator = (req, res, next) => {
  //  Name is not null
  req.check("username", "Name is required").notEmpty();
  // email is not null and valid
  req
    .check("email", "Please enter a valid email")
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
