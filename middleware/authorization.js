const jwt=require('jsonwebtoken')
require('dotenv').config()

function authorizeToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if( token == null) return res.sendStatus(403).send("No authorization header")
    jwt.verify(token,process.env.JWTPRIVATEKEY,(err,user)=>{
        if(err) return res.sendStatus(401).send(err)
        req.user=user
    })
    next();
}

module.exports = authorizeToken;