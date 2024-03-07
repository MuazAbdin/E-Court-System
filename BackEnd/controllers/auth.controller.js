import errorHandler from "../errors/errorHandler.js";
import { EmailAlreadyUsedError, IdNumberAlreadyUsedError, UserDoesNotExistError } from "../errors/user.error.js";
import { InvalidCredintialsError } from "../errors/userAuth.error.js";
import User from "../models/user.model.js";
import UserAuth from "../models/userAuth.model.js";
import authUtils from "../utils/auth.utils.js";
import AuthDataValidator from "../validators/auth.validate.js";

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

			AuthDataValidator.validateRegisterData(userData);
			if(await User.findOne({email})) {
				throw new EmailAlreadyUsedError();
			}
			if(await User.findOne({idNumber})) {
				throw new IdNumberAlreadyUsedError();
			}

			const user = new User(userData);
			const userAuth = new UserAuth({user, hashedPassword});

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

	async login(req, res) {
        const { email, password } = req.body;
		try {
			AuthDataValidator.validateLoginData(req.body);
	
			const user = await User.findOne({ email });
			if(!user) {
				throw new UserDoesNotExistError();
			}

			const userAuth = await UserAuth.findOne({ user: user._id });
			const userHashedPassword = userAuth.hashedPassword;
			authUtils.verifyPassword(password, userHashedPassword);

			const payload = {userId: user._id};
			const tokenCookie = authUtils.createTokenCookie(payload);
			res.setHeader('Set-Cookie', tokenCookie);
			res.json({ firstName: user.firstName, lastName: user.lastName });
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
	}

	logout(req, res) {
		res.clearCookie("token").sendStatus(204);
	}
}

const authController = new AuthController();
export default authController;
