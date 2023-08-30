const {
  authenticationUser,
  generateAccessToken,
} = require("../authentication/authMethods");
const { generateHash } = require("../authentication/hashMethods");
const User = require("../models/user.model");

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    throw error;
  }
};

const authUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await getUserByUsername(username);
    if (user) {
      const authResult = await authenticationUser(password, user.password);
      if (authResult) {
        const accessToken = generateAccessToken(user);
        res
          .header('Authorization', accessToken)
          .json({ success: true, message: "successfully authenticated user" });
      } else {
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { authUser };
