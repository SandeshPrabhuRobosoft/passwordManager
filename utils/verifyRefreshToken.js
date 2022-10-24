const UserToken = require('../models/UserToken.js');
const jwt = require('jsonwebtoken');

const verifyRefreshToken = (refreshToken) => {
	const privateKey = process.env.REFRESH_TOKEN_SECRET;

	return new Promise((resolve, reject) => {
		UserToken.findOne({ refreshToken: refreshToken}, (err, doc) => {
			if (!doc)
				return reject({ error: true, message: "Invalid refresh token" });

			jwt.verify(refreshToken.toString(), privateKey.toString(), (err, tokenDetails) => {
				if (err)
					return reject({ error: true, message: "Invalid refresh token" });
				resolve({
					tokenDetails,
					error: false,
					message: "Valid refresh token",
				});
			});
		});
	});
};

module.exports = verifyRefreshToken;