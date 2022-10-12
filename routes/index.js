const express=require('express')
const signup=require('../controller/signupController')
const signin=require('../controller/signinController')
const router=express.Router()
router.post('/signup',signup)
router.post('/signin',signin)
// const model=require('../models/user')





// const validation=(user)=>{
//     const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     regex.test(user.mobileNumber) ? mobileValidation=true : mobileValidation="invalid phone number"
//     user.MPin.toString().length==4 ? MPinValidation=true : MPinValidation="invalid MPin"
//     return {mobileValidation, MPinValidation}
// }

module.exports=router