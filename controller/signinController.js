const bcrypt = require('bcrypt')
const model=require('../models/user')

async function signin(req, res) {
  const [user] = await model.find({mobileNumber: req.body.mobileNumber}).clone()

  if (user == null)
    return res.status(400).send('Cannot find user')
  try {
    if(await bcrypt.compare(req.body.MPin.toString(), user.MPin)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
}
module.exports=signin