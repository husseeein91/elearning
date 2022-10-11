const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No Token, Authentication Denied" }] });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    let id = decoded.user.id;
    let user = await Admin.findById(id);
    if (user.role === "Admin") {
      req.user = decoded.user;
      next();
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: "You are not Authorized to access this" }] });
    }
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Token Expired" }] });
  }
};
