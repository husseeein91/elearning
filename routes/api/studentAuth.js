const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Student = require("../../models/Student");
const multer = require("multer");
const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("image must be JPEG, JPG OR PNG"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
  fileFilter: fileFilter,
});

const registrationValidate = [
  check("name", "Name is Required").not().isEmpty(),
  check("phone", "Phone Must Be A Valid Phone Number").isLength({
    min: 11,
    max: 11,
  }),
  check("password", "Password Must Be A 6 Or More Characters").isLength({
    min: 6,
  }),
  check("email", "Email Must Be A Valid Email").isEmail(),
  check("stage", "Stage is Required").not().isEmpty(),
  check("level", "level is Required").not().isEmpty(),
  check("mothersPhone", "Mother Phone is Required").not().isEmpty(),
  check("fathersPhone", "Father Phone is Required").not().isEmpty(),
  upload.single("image"),
];

// @route Post api/student/registration
// @desc students Registration
// @access public
router.post("/register", registrationValidate, async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    name,
    phone,
    email,
    password,
    stage,
    level,
    mothersPhone,
    fathersPhone,
  } = req.body;
  try {
    let student = await Student.findOne({ email });
    if (student) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This Email is Already Registered" }] });
    }

    student = new Student({
      name,
      email,
      phone,
      stage,
      level,
      mothersPhone,
      fathersPhone,
      image: req.file.path,
    });

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    await student.save();
    const payload = {
      user: {
        id: student._id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route Post api/student/login
// @desc students login
// @access public
router.post(
  "/login",
  [
    check("phone", "Phone is Required").not().isEmpty(),
    check("password", "Password Is Required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { phone, password } = req.body;
    try {
      let student = await Student.findOne({ phone });
      if (!student) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: student._id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
