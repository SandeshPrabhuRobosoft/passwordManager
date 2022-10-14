const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: Number,
        required:true,
        unique:true, // to keep unique (key)
        validate: {
            validator: function(v){
                return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v) // validation for different format : XXX XXX XXXX, XXX-XXX-XXXX, XXXXXXXXXX, etc.
              },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required:true,
    },
    MPin: {
        type: String,
        required:true
    }
});

module.exports=mongoose.model('userCollection',userSchema)