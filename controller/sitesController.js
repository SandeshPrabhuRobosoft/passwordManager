if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.PASSWORD_KEY)
const siteModel=require('../models/sites')

async function addSite(req,res){
    const site = new siteModel({
        mobileNumber:req.user.mobileNumber,
        URL: req.body.URL,
        siteName: req.body.siteName,
        folder:req.body.folder,
        userName:req.body.userName,
        password: await cryptr.encrypt(req.body.password),
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
        await siteModel.find({$and:[{folder:folder},{mobileNumber:req.user.mobileNumber}]},{__v:0,_id:0,mobileNumber:0}/*projection*/,function (err, documents)/*callback*/ {
            if (err)  return res.sendStatus(401).send(err)
            else{
                if(documents.length==0){
                    return res.send(`No sites in ${folder} category!`)
                }
                documents.map(docs=>docs.password= cryptr.decrypt(docs.password))
                return res.send(documents)
            } }).clone()
}

async function search(req,res){
    let search=req.query.search
    var regex = new RegExp(search, 'i');  // 'i' makes it case insensitive
    await siteModel.find({ mobileNumber:req.user.mobileNumber, $text: { $search: regex} } , (err, docs) => {
        if (docs) {
          res.status(200).send({ data: docs });
        } else res.send(err);
      }).clone()
}

async function selectedSite(req,res){   
    
    // opening selected site details using siteName along with userName
    // await siteModel.find({$and:[{mobileNumber:req.user.mobileNumber},{siteName:req.body.siteName},{userName:req.body.userName}]},{__v:0,_id:0,mobileNumber:0}/*projection*/,function (err, documents)/*callback*/ {
    
    // opening selected site details using the _id received by post method
    await siteModel.find({_id:req.body._id},{__v:0,_id:0,mobileNumber:0}/*projection*/,function (err, documents)/*callback*/ {
            if (err)  return res.sendStatus(401).send(err)
        else {
            documents.map(docs=>docs.password= cryptr.decrypt(docs.password))
            return res.send(documents)
        }}).clone()
}

async function editSite(req,res){
    const docs = await siteModel.find({_id:req.body._id},{__v:0,mobileNumber:0}/*projection*/,function (err)/*callback*/ {
        if (err)  return res.sendStatus(401).send(err)}).clone()
    delete req.body._id;    //remove _id from body such that _id won't get updated
    if(req.body.password) {req.body.password = await cryptr.encrypt(req.body.password)} //encryt password
    const data=await siteModel.findByIdAndUpdate({_id:docs[0]._id},req.body,function(err){
            if(err) console.log(err)}).clone()
    data.password= cryptr.decrypt(data.password)
    res.send(data)
}



module.exports={addSite,home,search,selectedSite,editSite}