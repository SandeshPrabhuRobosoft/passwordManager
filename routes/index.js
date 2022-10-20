const express=require('express')
const authorization=require('../middleware/authorization')
const signup=require('../controller/signupController')
const {signin,/*forgotPassword,*/refreshToken,logout}=require('../controller/signinController')
const {addSite,home,search,selectedSite,editSite,deleteSite}=require('../controller/sitesController')

const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/refreshToken',refreshToken)
router.delete('/logout',logout)
router.delete('/deleteSite',authorization,deleteSite)
// router.post('/forgotPassword',forgotPassword)
router.post('/home/addSite',authorization,addSite)
router.post('/home',authorization,home)
router.get('/home',authorization,search)
router.post('/home/selectedSite',authorization,selectedSite)
router.post('/home/selectedSite/editSite',authorization,editSite)
router.get('/sync',authorization,home)

module.exports=router