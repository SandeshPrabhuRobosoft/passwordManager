const bcrypt = require('bcrypt')
const model=require('../models/user')

async function signin(req, res) {
  const [user] = await model.find({mobileNumber: req.body.mobileNumber}).clone()

  if (user == null)
    return res.status(400).send('Cannot find user')
  try {
    if(await bcrypt.compare(req.body.MPin.toString(), user.MPin)) {
    const token = user.generateAuthToken();
		res.status(200).send({ token: token, message: "logged in successfully" });

    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
}
module.exports=signin