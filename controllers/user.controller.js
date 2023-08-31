const {
  authenticationUser,
  generateAccessToken,
} = require("../authentication/authMethods");
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
  try {
    const user = await getUserByUsername(username);
    if (user!==null) {
      const authResult = await authenticationUser(password, user.password);
      if (authResult===true) {
        const accessToken = generateAccessToken(user);
        res
          .header('Authorization', `Bearer ${accessToken}`)
          .json({ success: true, message: "Successfully authenticated user" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

module.exports = { authUser };
