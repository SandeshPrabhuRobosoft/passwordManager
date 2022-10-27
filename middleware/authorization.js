const jwt=require('jsonwebtoken')
require('dotenv').config()

function authorizeToken(req,res,next){
    const bearerHeader = req.headers["authorization"]; // bearerHeader = BEARER Token
    const token = bearerHeader && bearerHeader.split(" ")[1]; // token = Token
    if( token == null) return res.status(403).send("No authorization header")
    jwt.verify(token,process.env.JWTPRIVATEKEY,(err,user)=>{
        if(err) return res.status(401).send(err)
        req.user=user // add authorized user to request
        next();
    })
}

module.exports = authorizeToken;