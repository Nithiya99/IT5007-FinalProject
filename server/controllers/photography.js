const Photography = require("../models/photography");
const formidable = require("formidable");
const fs = require("fs");
const { off } = require("process");

exports.photographyServiceCheck = (req, res, next) => {
  res.send("Api Photography running");
};

exports.createPhotographySevice = async (req, res) => {
  req.businessProfile.hashed_password = undefined;
  req.businessProfile.salt = undefined;
  const photography = await new Photography(req.body);
  photography.serviceBy = req.businessProfile;
  photography.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json(result);
  });
};

exports.photographyByBusiness = (req, res) => {
  // Photography.find({ serviceBy: req.businessProfile._id })
  //   .populate("serviceBy", "_id businessName")
  //   .sort("_created")
  //   .exec((err, photographyServices) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: err,
  //       });
  //     }
  //     res.json(photographyServices);
  //   });
  Photography.find({ serviceBy: req.businessProfile._id })
    .populate("serviceBy", "_id businessName")
    .select("_id title description price image created")
    .then((photographies) => {
      res.json({ photographies }).catch((err) => console.log(err));
    });
};

exports.getPhotographyById = (req, res, next, _id) => {
  Photography.findById(_id).exec((err, photography) => {
    if (err || !photography) {
      return res.status(400).json({
        error: "Photography not found",
      });
    }
    req.photographyDetails = photography;
    next();
  });
};

exports.getPhotographyDetails = (req, res) => {
  // We do not want to return the password to the front end
  req.photographyDetails.hashed_password = undefined;
  req.photographyDetails.salt = undefined;
  return res.json(req.photographyDetails);
};

exports.getAllPhotography = (req, res) => {
  const photographies = Photography.find()
    .populate("serviceBy", "_id businessName")
    .select("_id title description price image created")
    .then((photographies) => {
      res.json({ photographies }).catch((err) => console.log(err));
    });
};
