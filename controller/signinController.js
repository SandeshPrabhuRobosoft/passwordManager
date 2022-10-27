const bcrypt = require('bcrypt')
const userModel=require('../models/user')
const speakeasy = require('speakeasy')
const generateTokens = require("../utils/generateTokens");
require('dotenv').config()

async function signin(req, res) {
  if(typeof req.body.mobileNumber!="number") return res.send("Enter a valid 10-digit Mobile Number")
  if(req.body.mobileNumber.toString().length!=10) return res.send("Enter a valid 10-digit Mobile Number")
  if(typeof req.body.MPin!="number") return res.send("Enter a valid 4-digit MPin")
  if(req.body.MPin.toString().length!=4) return res.send("Enter a valid 4-digit MPin")
  const [user] = await userModel.find({mobileNumber: req.body.mobileNumber}).clone()
  if (user == null)
    return res.status(404).send('Cannot find user')
  try {
    if(await bcrypt.compare(req.body.MPin.toString(), user.MPin)) { //compare MPin 
    const tokens =await generateTokens(user) // function call to generate tokens 
		res.status(200).send({ accessToken: tokens.accessToken, message: "logged in successfully" }); 
    } else {
      res.status(401).send('Incorrect Password')
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
        step: 60
    }),
    "secret":secret.base32,
    // "secretData":secret
})
 } catch (error) {
  res.status(500).send()

 } 
 
}

module.exports={signin,generateOTP}