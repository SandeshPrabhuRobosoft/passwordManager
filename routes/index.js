const express=require('express')
const authorization=require('../middleware/authorization')
const signup=require('../controller/signupController')
const {signin,generateOTP}=require('../controller/signinController')
const {addSite,home,search,selectedSite,editSite,deleteSite}=require('../controller/sitesController')
const {GetNewAccessToken,logout}=require('../controller/refreshToken')
const router=express.Router()
const {resetMPin, addNewMPin}=require('../controller/passwordController')
const verifyOTP=require('../middleware/verifyOTP')

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/refreshToken',GetNewAccessToken)
router.delete('/logout',authorization,logout)
router.delete('/deleteSite',authorization,deleteSite)
router.get('/generateOTP',generateOTP)
router.post('/verifyOTP',verifyOTP,addNewMPin)
router.post('/home/addSite',authorization,addSite)
router.post('/home',authorization,home)
router.get('/home',authorization,search)
router.post('/home/selectedSite',authorization,selectedSite)
router.post('/home/selectedSite/editSite',authorization,editSite)
router.get('/sync',authorization,home) // get all the site documents of the user
router.post('/resetMPin',authorization,resetMPin)
// router.post('/forgotPassword',forgotPassword)

module.exports=router 