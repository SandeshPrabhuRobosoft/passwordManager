const express=require('express')
const authorization=require('../middleware/authorization')
const signup=require('../controller/signupController')
const signin=require('../controller/signinController')
const {addSite,home,search,selectedSite,editSite}=require('../controller/sitesController')


const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/home/addSite',authorization,addSite)
router.post('/home',authorization,home)
router.get('/home',authorization,search)
router.post('/home/selectedSite',authorization,selectedSite)
router.post('/home/selectedSite/editSite',authorization,editSite)

// const model=require('../models/user')





// const validation=(user)=>{
//     const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     regex.test(user.mobileNumber) ? mobileValidation=true : mobileValidation="invalid phone number"
//     user.MPin.toString().length==4 ? MPinValidation=true : MPinValidation="invalid MPin"
//     return {mobileValidation, MPinValidation}
// }

module.exports=router