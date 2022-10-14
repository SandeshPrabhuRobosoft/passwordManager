const userModel=require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function signup(req,res){
    if(req.body.MPin.toString().length!=4) return res.send("Enter a valid 4-digit MPin")
    const salt = await bcrypt.genSalt(Number(process.env.SALT)); // salt generation
    const hashedPassword = await bcrypt.hash(req.body.MPin.toString(), salt) // bcrypting MPin
    const user = new userModel({ mobileNumber: req.body.mobileNumber, MPin: hashedPassword })
    await user.save((err)=>{
        if(err) res.sendStatus(400).send(err)
        else {
            res.sendStatus(202).send('Congrats!!! Success\nSignin to access the vault')
    
        }})
}

module.exports=signup