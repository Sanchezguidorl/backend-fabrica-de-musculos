const dotenv = require("dotenv");
dotenv.config();

const config = {
  user_db: process.env.DB_USER,
  password_db: process.env.DB_PASSWORD,
};

module.exports = { config };
