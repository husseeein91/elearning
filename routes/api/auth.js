const express = require("express");
const isAdmin = require("../../middleware/isAdmin");
const auth = require("../../middleware/auth");
const Admin = require("../../models/Admin");
const router = express.Router();

router.get("/", isAdmin, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
