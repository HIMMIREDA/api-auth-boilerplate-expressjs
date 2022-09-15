whiteListOrigins = require("./allowedOrigins.js");
corsOptions = {
  origin: (origin, callback) => {
    // remember to remove !origin in production
    if (whiteListOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = {
  ...corsOptions,
  optionsSuccessStatus: 200,
};
