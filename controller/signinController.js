const bcrypt = require('bcrypt')
const userModel=require('../models/user')
const jwt = require("jsonwebtoken");
const client=require('twilio')(/*accountSid*/"accountSid",/*authToken*/"authToken")
require('dotenv').config()

async function signin(req, res) {
  const [user] = await userModel.find({mobileNumber: req.body.mobileNumber}).clone()
  if (user == null)
    return res.status(404).send('Cannot find user')
  try {
    if(await bcrypt.compare(req.body.MPin.toString(), user.MPin)) { //compare MPin 
    const token = jwt.sign({ mobileNumber: user.mobileNumber }, process.env.JWTPRIVATEKEY, {expiresIn: "7d",}); // token signing using mobileNumber
    // const refreshToken=jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
		res.status(200).send({ token: token, message: "logged in successfully" }); 
    } else {
      res.sendStatus(401).send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
}

async function forgotPassword(req, res) {
  const [user] = await userModel.find({mobileNumber: req.body.mobileNumber}).clone()
  if (user == null)
    return res.status(404).send('Cannot find user')
  const mobileNumber=req.body.mobileNumber
  const OTP=Math.random() * (9999 - 1000) + 1000
  try{
     await client.messages.create({
      body: OTP, 
      from: '+15017122661', 
      to: mobileNumber.toString()
    })
  }
  catch{error=> res.sendStatus(500).send(error)};
  //compareOTP()
  // if wrong otp return invalid
  //else
}


async function refreshToken(req,res){
let accessToken=req.headers["authorization"].split(" ")[1]
  let refreshToken=process.env.REFRESH_TOKEN_SECRET
  if(refreshToken==null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
      if(err) return res.sendStatus(403)
      // const accessToken=generateAccessToken({name:user.name}) // for security entire user is not sent, only username is sent
      res.json({accessToken:accessToken})
  })
}

async function logout(req,res){ // to logout such that no more refresh tokens can be created
  refreshTokens=refreshTokens.filter(token=>token!==req.body.token)
  res.sendStatus(204)
}

module.exports={signin,forgotPassword,refreshToken,logout}