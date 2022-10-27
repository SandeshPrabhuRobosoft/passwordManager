const speakeasy = require('speakeasy')
async function verifyOTP(req, res, next) {
    try {
       const valid= speakeasy.totp.verify({
         secret: req.body.secret,
         encoding: "base32",
         token: req.body.token,
         window: 0,
         step: 60
     })
     if(!valid) return res.send("OTP Verification failed")
    } catch (error) {
     res.status(500).send()
    } 
    next()
}

module.exports=verifyOTP