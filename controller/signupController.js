const userModel=require('../models/user')
const bcrypt = require('bcrypt')
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

async function signup(req,res){
    if(req.body.MPin.toString().length!=4) return res.send("Enter a valid 4-digit MPin")
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.MPin.toString(), salt)
    const user = new userModel({ mobileNumber: req.body.mobileNumber, MPin: hashedPassword })
//     let {mobileValidation, MPinValidation} = validation(user)
//     if(mobileValidation==true && MPinValidation==true){
//         user.save((err)=>{
//             if(err){
//                 res.send(err)
//             }
//         })
//         res.send("successfull")
//     }
//     else{
//         res.send({'mobileValidation':mobileValidation, 'MPinValidation':MPinValidation})///////////////////////////
//     }
    await user.save((err)=>{
        if(err) res.send(err)
        else {
            res.send('Congrats!!! Success\nSignin to access the vault')
    
        }})
}

module.exports=signup