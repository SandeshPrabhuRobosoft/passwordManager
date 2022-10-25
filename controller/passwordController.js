const userModel=require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function resetMPin(req,res){
    const newMPin = req.body.newMPin.toString()
    const oldMPin = req.body.oldMPin.toString()
    if(newMPin.length!=4) return res.send("Enter a valid 4-digit new MPin")
    if(oldMPin.length!=4) return res.send("Enter a valid 4-digit old MPin")
    const [userData] = await userModel.find({mobileNumber: req.user.mobileNumber}).clone()
    try {
        if(await bcrypt.compare(req.body.oldMPin.toString(), userData.MPin.toString())) { //compare MPin 
            const salt = await bcrypt.genSalt(Number(process.env.SALT)); // salt generation
            const hashedPassword = await bcrypt.hash(req.body.newMPin.toString(), salt) // bcrypting MPin
            await userModel.findOneAndUpdate({ mobileNumber: req.user.mobileNumber},{ MPin: hashedPassword },(err)=>{ //Update in database
                if(err) return res.send(err)
            }).clone();
            res.status(200).send("MPin successfully Updated")
        } 
        else {
            return res.status(401).send('Wrong Old MPin')
        }
    } 
    catch(err) {
        return res.status(500).send(err)
    }
}

async function addNewMPin(req,res){
    const newMPin = req.body.newMPin.toString()
    if(newMPin.length!=4) return res.send("Enter a valid 4-digit new MPin")
    try {
        const salt = await bcrypt.genSalt(Number(process.env.SALT)); // salt generation
        const hashedPassword = await bcrypt.hash(req.body.newMPin.toString(), salt) // bcrypting MPin
        await userModel.findOneAndUpdate({ mobileNumber: req.user.mobileNumber},{ MPin: hashedPassword },(err)=>{ //Update in database
            if(err) return res.send(err)
        }).clone();
        res.status(200).send("MPin successfully Updated")
    } 
    catch(err) {
        return res.status(500).send(err)
    }
}

module.exports={resetMPin,addNewMPin}