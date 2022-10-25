const bcrypt = require('bcrypt')
const userModel=require('../models/user')
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy')
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
		res.status(200).send({ accessToken: tokens.accessToken, message: "logged in successfully" }); 
    } else {
      res.status(401).send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
}

async function generateOTP(req, res) {
 try {
  const secret = speakeasy.generateSecret({length: 10})
  res.send({
    "token": speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
        step: 30
    }),
    "secret":secret.base32,
    "secretData":secret
})
 } catch (error) {
  console.log(error)
  res.status(500).send()

 } 
 
}
async function verifyOTP(req, res) {
 try {
  res.send({
    "valid": speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: "base32",
      token: req.body.token,
      window: 0,
      step: 30
  })
})
 } catch (error) {
  console.log(error)
  res.status(500).send()

 } 
}

module.exports={signin,generateOTP,verifyOTP}
