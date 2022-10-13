const mongoose=require('mongoose')
const jwt = require("jsonwebtoken");
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
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

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

module.exports=mongoose.model('userCollection',userSchema)