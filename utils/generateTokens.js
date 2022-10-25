const jwt = require('jsonwebtoken');
const UserToken =require('../models/UserToken.js');

const generateTokens = async (user) => {
	try {
		const accessToken = jwt.sign(
			{mobileNumber: user.mobileNumber },
			process.env.JWTPRIVATEKEY,
			{ expiresIn: "30m" }
		);
		const refreshToken = jwt.sign(
			{mobileNumber: user.mobileNumber },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "10d" }
		);

		const userToken = await UserToken.findOne({ mobileNumber: user.mobileNumber  });
		if (userToken) await userToken.remove(); // remove matched document with old refresh token

		await new UserToken({ mobileNumber: user.mobileNumber, refreshToken: refreshToken }).save(); // create new document with new refresh token
		return Promise.resolve({ accessToken, refreshToken });
	} catch (err) {
		return Promise.reject(err);
	}
};

module.exports = generateTokens;