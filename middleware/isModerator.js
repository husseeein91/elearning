const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No Token, Action Denied" }] });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    let id = decoded.user.id;
    let user = await Admin.findOne({ id });
    if (user.role === "Moderator" || user.role === "Admin") {
      req.user = decoded.user;
      next();
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: "You are not Authorized to access this" }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ errors: [{ msg: "Token Expired" }] });
  }
};
