require("dotenv").config();
const corsOptions = require("./config/corsOptions.js");
const PORT = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middlewares/verifyJWT.js");
const verifyCSRF = require("./middlewares/verifyCSRF.js");
const credentials = require("./middlewares/credentials.js");





// database connection
require("./config/database.js").connect();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions)); //for Cross origin resource sharing
app.use(credentials);    // to allow sharing credentials (cookies) between different origins


app.use("/", require("./routes/auth.js"));



app.use("/posts",verifyCSRF,verifyJWT,require("./routes/api/posts.js"))

app.all("*", (req, res) => {
  res.status(404).json({ message: "endpoint doesnt exist" });
});



app.listen(PORT, () => {
  console.log(process.env.PORT);
  
});
