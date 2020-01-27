const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");
  //If no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //Verify the token
  try {
    const deccoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = deccoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
