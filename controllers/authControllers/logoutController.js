const User = require("../../models/User.js");

const logoutUser = async (req, res) => {
  // delete accessToken on client
  const refreshToken = req.cookies["JWT-REFRESH-TOKEN"];
  if (!refreshToken) {
    res.clearCookie("JWT-REFRESH-TOKEN", { httpOnly: true });
    res.clearCookie("XSRF-TOKEN");
    return res.sendStatus(204);
  }

  const user = await User.findOne({ RefreshTokens: refreshToken });
  if (!user) {
    res.clearCookie("JWT-REFRESH-TOKEN", { httpOnly: true });
    res.clearCookie("XSRF-TOKEN");
    return res.sendStatus(204);
  }
  // delete refreshToken from db
  user.RefreshTokens = user.RefreshTokens.filter(
    (token) => token !== refreshToken
  );

  await user.save();
  res.clearCookie("JWT-REFRESH-TOKEN", { httpOnly: true });
  res.clearCookie("XSRF-TOKEN");
  return res.sendStatus(204);
};

module.exports = {
  logoutUser,
};
