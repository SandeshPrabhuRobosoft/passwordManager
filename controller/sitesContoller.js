if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const bcrypt = require('bcrypt')
const siteModel=require('../models/sites')

async function addSite(req,res){
    const site = new siteModel({
        mobileNumber:req.user.mobileNumber,
        URL: req.body.URL,
        siteName: req.body.siteName,
        folder:req.body.folder,
        userName:req.body.userName,
        password: await bcrypt.hash(req.body.password.toString(), await bcrypt.genSalt(Number(process.env.SALT))),
        notes:req.body.notes
    })

    site.save((err)=>{
        if(err) return res.send(err)
        else {
            res.send('Saved Successfully')
    
        }})
}

async function home(req,res){
        let folder = req.body.folder
        await siteModel.find({$and:[{folder:folder},{mobileNumber:req.user.mobileNumber}]},{__v:0}/*projection*/,function (err, documents)/*callback*/ {
            if (err)  return res.sendStatus(401).send(err)
            else{
                if(documents.length==0){
                    return res.send(`No sites in ${folder} category!`)
                }
                return res.send(documents)
            } }).clone()
}

async function selectedSite(req,res){   // opening selected site details using siteName along with userName
    await siteModel.find({$and:[{mobileNumber:req.user.mobileNumber},{siteName:req.body.siteName},{userName:req.body.userName}]},{__v:0}/*projection*/,function (err, documents)/*callback*/ {
        if (err)  return res.sendStatus(401).send(err)
        else return res.send(documents)}).clone()
}

module.exports={addSite,home,selectedSite}