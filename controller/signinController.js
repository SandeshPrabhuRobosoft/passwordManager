const bcrypt = require('bcrypt')
const userModel=require('../models/user')
const jwt = require('jsonwebtoken');
const generateTokens = require("../utils/generateTokens");
// const client=require('twilio')(/*accountSid*/"accountSid",/*authToken*/"authToken")
require('dotenv').config()

async function signin(req, res) {
  const [user] = await userModel.find({mobileNumber: req.body.mobileNumber}).clone()
  if (user == null)
    return res.status(404).send('Cannot find user')
  try {
    if(await bcrypt.compare(req.body.MPin.toString(), user.MPin)) { //compare MPin 
    const tokens =await generateTokens(user) // function call to generate tokens 
		res.status(200).send({ token: tokens, message: "logged in successfully" }); 
    } else {
      res.status(401).send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
}
/*
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
  //proceed to login
}
*/

module.exports={signin/*,forgotPassword*/}
