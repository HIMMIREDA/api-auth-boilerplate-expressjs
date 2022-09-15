const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password cant be empty fields" });
  }
  const user = await User.findOne({ email }).exec();

  if (!user || !(await bcrypt.compare(password.toString(), user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const payload = {
    email,
    id: user.id,
    xsrfToken: crypto.randomBytes(16).toString("hex")
  };

  //   create refresh and access tokens
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: 60 * 30 }
  );
  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "31d" }
  );
  user.RefreshTokens.push(refreshToken);
  await user.save();

  res.cookie("XSRF-TOKEN", payload.xsrfToken);
  res.cookie("JWT-REFRESH-TOKEN", refreshToken, { httpOnly: true });

  return res.status(200).json({
    accessToken,
  });
};

module.exports = {
  loginUser,
};
