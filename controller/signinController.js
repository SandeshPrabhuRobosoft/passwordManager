const bcrypt = require('bcrypt')
const userModel=require('../models/user')
const jwt = require("jsonwebtoken");
if(process.env.NODE_ENV !== 'production'){ // if dotenv module is installed as dev dependency
    require('dotenv').config()
}

async function signin(req, res) {
  const [user] = await userModel.find({mobileNumber: req.body.mobileNumber}).clone()
  if (user == null)
    return res.status(404).send('Cannot find user')
  try {
    if(await bcrypt.compare(req.body.MPin.toString(), user.MPin)) { //compare MPin 
    const token = jwt.sign({ mobileNumber: user.mobileNumber }, process.env.JWTPRIVATEKEY, {expiresIn: "7d",}); // token signing using mobileNumber
		res.status(200).send({ token: token, message: "logged in successfully" }); 
    } else {
      res.sendStatus(401).send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
}

module.exports=signin