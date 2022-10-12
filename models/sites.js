const mongoose=require('mongoose')
var siteSchema = new Schema({
    URL: { 
        type: String,
        validate: { 
            validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
            message: 'Must be a Valid URL' 
            },
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
        unique: true
    },
    password: {
        type: String,
        required: true 
    },
    Notes:{
        type: String,
    }
  })
  module.exports = mongoose.model('siteCollection', siteSchema);