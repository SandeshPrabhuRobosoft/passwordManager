const express=require('express')
const authorization=require('../middleware/authorization')
const signup=require('../controller/signupController')
const {signin/*,forgotPassword*/}=require('../controller/signinController')
const {addSite,home,search,selectedSite,editSite,deleteSite}=require('../controller/sitesController')
const {GetNewAccessToken,logout}=require('../controller/refreshToken')
const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/refreshToken',GetNewAccessToken)
router.delete('/logout',logout)
router.delete('/deleteSite',authorization,deleteSite)
// router.post('/forgotPassword',forgotPassword)
router.post('/home/addSite',authorization,addSite)
router.post('/home',authorization,home)
router.get('/home',authorization,search)
router.post('/home/selectedSite',authorization,selectedSite)
router.post('/home/selectedSite/editSite',authorization,editSite)
router.get('/sync',authorization,home) // get all the site documents of the user

module.exports=router