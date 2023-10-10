require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const URI_DATABASE = process.env.URI_DATABASE;
const USER_EMAIL = process.env.USER_EMAIL;
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID;
const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET;

module.exports = {
  SECRET_KEY,
  URI_DATABASE,
  USER_EMAIL,
  PASSWORD_EMAIL,
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
};
