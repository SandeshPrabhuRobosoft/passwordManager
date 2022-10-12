const express=require('express')
const router=express.Router()
const model=require('../models/user')
// const model=require('../models/user')

// const signup=require('../controller/signupController')

router.post('/signup',(req,res)=>{
    let user = new model({
        mobileNumber:req.body.mobileNumber,
        MPin:req.body.MPin
    })
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
    user.save((err)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("ok")
        }
                })
    }
)

// const validation=(user)=>{
//     const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     regex.test(user.mobileNumber) ? mobileValidation=true : mobileValidation="invalid phone number"
//     user.MPin.toString().length==4 ? MPinValidation=true : MPinValidation="invalid MPin"
//     return {mobileValidation, MPinValidation}
// }

module.exports=router