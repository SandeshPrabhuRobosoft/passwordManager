const mongoose=require('mongoose')
var siteSchema = new mongoose.Schema({
    mobileNumber:{ 
        type:Number
        // type:mongoose.Schema.Types.ObjectId,
        //  ref:'userCollection'
        },
    URL: { 
        type: String,
        required: true
        },
    siteName: {
        type: String,
        required: true
    },
    folder:{
        type: String,
        required: true
    },
    userName:{
        type: String, 
        required: true, 
    },
    password: {
        type: String,
        required: true 
    },
    notes:{
        type: String,
    }
  })
  siteSchema.index({'$**': 'text'})
  module.exports = mongoose.model('siteCollection', siteSchema);