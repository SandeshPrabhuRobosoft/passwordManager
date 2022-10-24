const UserToken = require('../models/UserToken.js');
const jwt = require('jsonwebtoken');
const verifyRefreshToken = require('../utils/verifyRefreshToken.js');

// get new access token
async function GetNewAccessToken(req, res) {
	try{
		const response = await verifyRefreshToken(req.body.refreshToken).catch((err)=>res.send(err))

		const accessToken = jwt.sign(
			{mobileNumber: response.tokenDetails.mobileNumber },
			process.env.JWTPRIVATEKEY,
			{ expiresIn: "14m" }
		);
		res.status(200).json({
			error: false,
			accessToken,
			message: "Access token created successfully",
		});
	}
	catch{
		((err) => res.status(400).json(err));
	}
};

// logout
async function logout(req, res) {
	try {

		const userToken = await UserToken.findOne({ refreshToken: req.body.refreshToken });
		if (!userToken)
			return res
				.status(200)
				.json({ error: false, message: "logged Out Sucessfully" });

		await userToken.remove();
		res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
	} catch (err) {
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
};

module.exports={GetNewAccessToken,logout}