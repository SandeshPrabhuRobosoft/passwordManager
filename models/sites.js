const mongoose=require('mongoose')
var siteSchema = new mongoose.Schema({
    mobileNumber:{ 
        type:Number
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
  siteSchema.index({'$**': 'text'}) // creating index for text
  module.exports = mongoose.model('siteCollection', siteSchema);