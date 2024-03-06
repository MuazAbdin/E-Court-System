import errorHandler from "../errors/errorHandler.js";
import User from "../models/user.model.js";
import UserAuth from "../models/userAuth.model.js";
import authUtils from "../utils/auth.utils.js";
import RegisterDataValidator from "../validators/register.validate.js";

class AuthController {
	async register(req, res) {
        const { password, confirmPassword, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber } = req.body;

		try {
			RegisterDataValidator.validatePassword(password, confirmPassword);
			const hashedPassword = authUtils.hashPassword(password);
	
			const userData = { idNumber, firstName, lastName, userType, email, phoneNumber, city, street };
			// TODO add check for userType instead of licenseNumber value
			if(licenseNumber)
				userData.licenseNumber = licenseNumber;
			RegisterDataValidator.validateUserData(userData);
			const user = new User(userData);
			const userAuth = new UserAuth(user, hashedPassword);
	
			user.save();
			userAuth.save();
		
			const payload = { userId: user._id };
			const tokenCookie = authUtils.createTokenCookie(payload);
			res.setHeader('Set-Cookie', tokenCookie);
			res.json({ firstName: user.firstName, lastName: user.lastName });
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	login(req, res) {
		res.status(404).send("Work In Progress!");
	}

	logout(req, res) {
		res.status(404).send("Work In Progress!");
	}
}

const authController = new AuthController();
export default authController;
