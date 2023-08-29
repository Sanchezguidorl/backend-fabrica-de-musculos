const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticationUser = async (password, passwordHashed) => {
  try {
    const passwordValidate = await bcrypt.compare(password, passwordHashed);
    return passwordValidate;
  } catch (error) {
    throw error;
  }
};

const generateAccessToken = (username) => {
  return jwt.sign(username.toJSON(), process.env.SECRET, {
    expiresIn: "9000m",
  });
};

const validateToken = (req, res, next) => {
  let accessToken = req.headers["authorization"];

  if (!accessToken) return res.send("Access denied");
  accessToken = accessToken.replace("Bearer ", "");
  const secret = process.env.SECRET;
  jwt.verify(accessToken, secret, (err, user) => {
    if (err) {
      res.send("Access denied, token expired or incorrect");
    } else {
      next();
    }
  });
};

module.exports = { authenticationUser, generateAccessToken, validateToken };
