const model=require('../models/user')
const bcrypt = require('bcrypt')

async function signup(req,res){
    const hashedPassword = await bcrypt.hash(req.body.MPin.toString(), 10)
    const user = new model({ mobileNumber: req.body.mobileNumber, MPin: hashedPassword })
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
        else res.send('ok')})
}

module.exports=signup