require("dotenv").config();
const jwt = require("jsonwebtoken");


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const accesToken = authHeader && authHeader.split(" ")[1];

    if(!accesToken){
        return res.sendStatus(401);
    }

    try{
        const decoded = jwt.verify(accesToken,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        req.user = { id: decoded.id, email: decoded.email };
        next();

    }catch(error){
        return res.status(403).json({message: error.message});
    }
}


module.exports = verifyJWT;