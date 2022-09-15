const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordPattern = /.{6,}/;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and password cant be empty fields" });
  }

  // check user input
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "bad email" });
  }
  if (!passwordPattern.test(password)) {
    return res
      .status(400)
      .json({ message: "password must be at least 6 characters" });
  }

  // check if email is unique
  if (await User.exists({ email })) {
    return res.status(400).json({ message: "email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password.toString(), 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();

    //   create jwt access and refresh tokens
    const payload = {
      email,
      id: user.id,
      xsrfToken: crypto.randomBytes(16).toString("hex")
    };

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

    return res.status(201).json({
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "user cant be created" });
  }
};

module.exports = {
  registerUser,
};
