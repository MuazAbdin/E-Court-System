import mongoose from "mongoose";
import errorHandler from "../errors/errorHandler.js";
import {
  EmailAlreadyUsedError,
  IdNumberAlreadyUsedError,
  InvalidUserTypeError,
  UserDoesNotExistError,
} from "../errors/user.error.js";
import { InvalidCredintialsError } from "../errors/userAuth.error.js";
import User from "../models/user.model.js";
import UserAuth from "../models/userAuth.model.js";
import authUtils from "../utils/auth.utils.js";
import AuthDataValidator from "../validators/auth.validate.js";

class AuthController {
  async register(req, res) {
    console.log(req.body);
    const {
      password,
      passwordConfirm: confirmPassword,
      IDcard: idNumber,
      firstName,
      lastName,
      userType,
      email,
      mobile: phoneNumber,
      city,
      street,
      licenseNumber,
    } = req.body;

    try {
      const userData = {
        password,
        confirmPassword,
        idNumber,
        firstName,
        lastName,
        userType,
        email,
        phoneNumber,
        city,
        street,
      };
      // TODO add check for userType instead of licenseNumber value
      if (licenseNumber) {
        userData.licenseNumber = licenseNumber;
      }

      AuthDataValidator.validateRegisterData(userData);

      const foundUser = await User.findOne({ idNumber });
      console.log(foundUser);
      if (foundUser) throw new IdNumberAlreadyUsedError();

      const user = new User(userData);
      const userAuth = new UserAuth({ user, hashedPassword: password });

      await user.save();
      await userAuth.save();

      const payload = { userId: user._id };
      const tokenCookie = authUtils.createTokenCookie(payload);
      res.setHeader("Set-Cookie", tokenCookie);
      res.json({ firstName: user.firstName, lastName: user.lastName });
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
      res.json({ firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
      errorHandler.handleError(res, error);
    }
  }

  logout(req, res) {
    res.clearCookie("token").sendStatus(204);
  }
}

const authController = new AuthController();
export default authController;
