const jwt = require("jsonwebtoken");

const verifyCSRF = (req, res, next) => {
  // csrf protection
  const xsrfTokenHeader = req.headers["x-xsrf-token"];
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(403).json({ message: "no accessToken found" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
    if (decoded.xsrfToken !== xsrfTokenHeader) {
      return res.status(403).json({ message: "a CSRF attack detected" });
    }

    return next();

  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

module.exports = verifyCSRF;
