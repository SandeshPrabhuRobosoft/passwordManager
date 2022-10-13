const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: Number,
        required:true,
        unique:true,
        validate: {
            validator: function(v){
                return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(v)
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