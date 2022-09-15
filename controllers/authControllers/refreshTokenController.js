const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies["JWT-REFRESH-TOKEN"];
  if (!refreshToken) {
    res.clearCookie("JWT-REFRESH-TOKEN", { httpOnly: true });
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY
    );
    const payload = {
      id: decoded.id,
      email: decoded.email,
      xsrfToken: decoded.xsrfToken,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: 60 * 30,
      }
    );
    const newRefreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "31d",
      }
    );

    const user = await User.findOne({ RefreshTokens: refreshToken });
    if (!user || user.email !== decoded.email) {
      return res.sendStatus(403);
    }
    user.RefreshTokens = user.RefreshTokens.map((token) =>
      token === refreshToken ? newRefreshToken : token
    );
    await user.save();
    res.cookie("JWT-REFRESH-TOKEN", newRefreshToken, { httpOnly: true });
    return res.status(200).json({ accessToken });
  } catch (e) {
    res.clearCookie("JWT-REFRESH-TOKEN", { httpOnly: true });
    return res.status(403).json({ message: e.message });
  }
};

module.exports = { refreshToken };
