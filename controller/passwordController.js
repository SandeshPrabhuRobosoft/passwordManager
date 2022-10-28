const userModel=require('../models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

async function resetMPin(req,res){
    if(typeof req.body.oldMPin!="number") return res.send("Enter a valid 4-digit old MPin")
    if(typeof req.body.newMPin!="number") return res.send("Enter a valid 4-digit new MPin")
    if(req.body.oldMPin==req.body.newMPin) return res.send("New MPin cannot be same as old MPin")
    if(req.body.newMPin.toString().length!=4) return res.send("Enter a valid 4-digit new MPin")
    if(req.body.oldMPin.toString().length!=4) return res.send("Enter a valid 4-digit old MPin")
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
        const docs = await userModel.findOneAndUpdate({ mobileNumber: req.body.mobileNumber},{ MPin: hashedPassword },(err)=>{ //Update in database
            if(err) return res.send(err)
        }).clone();
        if(docs==null) return res.send("User is not registered")
        return res.status(200).send("MPin successfully Updated")
    } 
    catch(err) {
        return res.status(500).send(err)
    }
}

module.exports={resetMPin,addNewMPin}