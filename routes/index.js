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

module.exports=router