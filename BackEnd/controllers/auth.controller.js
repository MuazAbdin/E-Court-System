import mongoose from "mongoose";
import errorHandler from "../errors/errorHandler.js";
import { IdNumberAlreadyUsedError, InvalidUserTypeError, UserDoesNotExistError } from "../errors/user.error.js";
import { InvalidCredintialsError } from "../errors/userAuth.error.js";
import User from "../models/user.model.js";
import UserAuth from "../models/userAuth.model.js";
import authUtils from "../utils/auth.utils.js";
import AuthDataValidator from "../validators/auth.validate.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();

class AuthController {
    async register(req, res) {
        const {
        password, passwordConfirm: confirmPassword, 
        IDcard: idNumber, firstName, lastName, userType, email, 
        mobile: phoneNumber, city, street, licenseNumber
        } = req.body;

        try {
            const userData = { password, confirmPassword, 
                idNumber, firstName, lastName, userType, 
                email, phoneNumber, city, street,
            };
            // if (userType === "Lawyer" || userType === "Judge") {
            //     userData.licenseNumber = licenseNumber;
            // }

            AuthDataValidator.validateRegisterData(userData);

            const foundUser = await User.findOne({ idNumber });
            if (foundUser) throw new IdNumberAlreadyUsedError();

            const user = new User(userData);
            const userAuth = new UserAuth({ user, hashedPassword: password });

            await user.save();
            await userAuth.save();

            const payload = { userId: user._id };
            const tokenCookie = authUtils.createTokenCookie(payload);
            res.setHeader("Set-Cookie", tokenCookie);
            res.json({ firstName: user.firstName, lastName: user.lastName, userType: user.userType });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                if (error.errors.userType) {
                    return errorHandler.handleError(res, new InvalidUserTypeError());
                }
            }
            errorHandler.handleError(res, error);
        }
    }

    async login(req, res) {
        const { IDcard: idNumber, password } = req.body;
        try {
            AuthDataValidator.validateLoginData({ idNumber, password });

            const user = await User.findOne({ idNumber });
            if (!user) {
                throw new UserDoesNotExistError();
            }

            const userAuth = await UserAuth.findOne({ user: user._id });
            const userHashedPassword = userAuth.hashedPassword;
            authUtils.verifyPassword(password, userHashedPassword);

            const payload = { userId: user._id };
            const tokenCookie = authUtils.createTokenCookie(payload);
            res.setHeader("Set-Cookie", tokenCookie);
            res.json({ firstName: user.firstName, lastName: user.lastName, userType: user.userType });
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    logout(req, res) {
        res.clearCookie("token").sendStatus(204);
    }

    async loginWithGoogle(req, res) {
        const { credential, client_id } = req.body;
        try {
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: client_id,
            });
            const payload = ticket.getPayload();
            const {
                sub: userGID,
                given_name: firstName,
                family_name: lastName,
                email,
                email_verified,
            } = payload;
            if (!email_verified) throw new InvalidCredintialsError();
            const jwtPayload = { userGID, firstName, lastName, email, visitor: true };
            const tokenCookie = authUtils.createTokenCookie(jwtPayload);
            res.setHeader("Set-Cookie", tokenCookie);
            res.json({
                msg: "logged in successfully",
                payload: { userGID, firstName, lastName, email },
            });
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }
}

const authController = new AuthController();
export default authController;
