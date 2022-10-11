const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Admin = require("../../models/Admin");

// @route Post api/admin
// @desc Admin and Moderator Registration
// @access public
router.post(
  "/",
  [
    check("name", "Name Is Required").not().isEmpty(),
    check("email", "Email Must Be A Valid Email").isEmail(),
    check(
      "password",
      "Password Is Required And Must Be A 6 Or More Characters"
    ).isLength({
      min: 6,
    }),
    check("phone", "Phone Must Be A Valid Phone Number").isLength({
      min: 11,
      max: 11,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, phone, password, role } = req.body;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This Email is Already Registered" }] });
      }

      admin = new Admin({
        name,
        email,
        phone,
        role,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        user: {
          id: admin._id,
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

// @route Post api/admin/login
// @desc Admin and Moderator login
// @access public
router.post(
  "/login",
  [
    check("email", "Email must be a valid Email").isEmail(),
    check("password", "Password field is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await Admin.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
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
