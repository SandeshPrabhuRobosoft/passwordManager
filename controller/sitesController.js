require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.PASSWORD_KEY) // for password encryption
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
        if(err) return res.status(400).send(err)
        else {
            res.send('Saved Successfully')
        }})
}

async function home(req,res){ // home page showing sites of selected folder
        let folder = req.body.folder || "All" //default all sites will be returned
        let filter={mobileNumber:req.user.mobileNumber} //filter to return all sites
        if(folder!="All"){
            filter={$and:[{folder:folder},{mobileNumber:req.user.mobileNumber}]} // filter to return specified sites
        }
        await siteModel.find(filter,{__v:0,_id:0,mobileNumber:0}/*projection*/,function (err, documents)/*callback*/ {
            if (err)  return res.status(401).send(err)
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
    await siteModel.find({ mobileNumber:req.user.mobileNumber, $text: { $search: regex} } ,{__v:0,mobileNumber:0,_id:0}, (err, docs) => {
        if (docs) {
            docs.map(documents=>documents.password= cryptr.decrypt(documents.password))
            res.status(200).send(docs);
        } else res.status(500).send(err);
      }).clone()
}

async function selectedSite(req,res){   
    
    // opening selected site details using siteName along with userName
    // await siteModel.find({$and:[{mobileNumber:req.user.mobileNumber},{siteName:req.body.siteName},{userName:req.body.userName}]},{__v:0,_id:0,mobileNumber:0}/*projection*/,function (err, documents)/*callback*/ {
    
    // opening selected site details using the _id received by post method
    await siteModel.find({$and:[{_id:req.body._id},{mobileNumber:req.user.mobileNumber}]},{__v:0,_id:0,mobileNumber:0}/*projection*/,function (err, documents)/*callback*/ {
            if (err)  return res.status(401).send(err)
            if(documents.length==0) return res.status(401).send("Unauthorized access to the site")  // if Id of other site is given
            documents.map(docs=>docs.password= cryptr.decrypt(docs.password))   
            return res.send(documents)
        }).clone()
}

async function editSite(req,res){
    const docs = await siteModel.find({$and:[{_id:req.body._id},{mobileNumber:req.user.mobileNumber}]},{__v:0,mobileNumber:0}/*projection*/,function (err)/*callback*/ {
        if (err)  return res.send(err)}).clone()
    if(docs.length==0) return res.status(401).send("Unauthorized access to the site") // if Id of other site is given
    delete req.body._id;
    delete req.body.mobileNumber;
    //remove _id and mobileNumber from body such that _id won't get updated
    if(req.body.password) {req.body.password = await cryptr.encrypt(req.body.password)} //encryt password
    const data=await siteModel.findByIdAndUpdate({_id:docs[0]._id},req.body,function(err){
        if(err) console.log(err)
    }).clone()
    data.password= cryptr.decrypt(data.password)
    return res.send(data)
}

async function deleteSite(req,res){   
    await siteModel.findOneAndDelete({$and:[{_id:req.body._id},{mobileNumber:req.user.mobileNumber}]},function (err,docs)/*callback*/ {
        if (err) return res.status(401).send(err)
    if(docs==null) return res.status(401).send("Unauthorized access to the site") // if Id of other site is given
    return res.send("Site deleted")}).clone()
}

module.exports={addSite,home,search,selectedSite,editSite,deleteSite}