const UserToken = require('../models/UserToken.js');
const jwt = require('jsonwebtoken');
const verifyRefreshToken = require('../utils/verifyRefreshToken.js');

// get new access token
async function GetNewAccessToken(req, res) {
	verifyRefreshToken(req.body.refreshToken)
		.then(() => {
            console.log("hi")
			const accessToken = jwt.sign(
				{mobileNumber: tokenDetails.mobileNumber },
				process.env.JWTPRIVATEKEY,
				{ expiresIn: "14m" }
			);
            
			res.status(200).json({
				error: false,
				accessToken,
				message: "Access token created successfully",
			});
            
		})
		.catch((err) => res.status(400).json(err));
        
};

// logout
// router.delete("/", async (req, res) => {
async function logout(req, res) {
	try {

		const userToken = await UserToken.findOne({ refreshToken: req.body.refreshToken });
		if (!userToken)
			return res
				.status(200)
				.json({ error: false, message: "Logged Out Sucessfully" });

		await userToken.remove();
		res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
	} catch (err) {
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
};


module.exports={GetNewAccessToken,logout}