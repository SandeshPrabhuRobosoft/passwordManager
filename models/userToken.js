const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
	mobileNumber: {
		type: Number,
		required: true,
	},
	refreshToken: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		//expires: 10 * 86400, // deletes itself in 10 days
	}
});

const UserToken = mongoose.model("UserToken", userTokenSchema);
module.exports =  UserToken;