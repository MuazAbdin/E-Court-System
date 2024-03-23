import { UserDoesNotExistError, NoUsersFoundError, NoJudgesFoundError, NoLawyersFoundError } from "../errors/user.error.js";
import errorHandler from "../errors/errorHandler.js";
import User from "../models/user.model.js";
import { DBConfig } from "../config.js";
import UserValidator from "../validators/users.validate.js";
import GenericValidator from "../validators/generic.validate.js";
import UserAuth from "../models/userAuth.model.js";
import authUtils from "../utils/auth.utils.js";
import AuthDataValidator from "../validators/auth.validate.js";

class UserController {
    async getJudges(req, res) {
        try {
            const judges = await User.find({ userType: "Judge" });
            if (judges.length === 0) {
                throw new NoJudgesFoundError();
            }
            res.json(judges);
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    async getLawyers(req, res) {
        try {
            const lawyers = await User.find({ userType: "Lawyer" });
            if (lawyers.length === 0) {
                throw new NoLawyersFoundError();
            }
            res.json(lawyers);
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    async getUser(req, res) {
        const userId = req.userId;
        const userType = req.userType;
        try {
            if(userType === "Visitor") {
                res.json({
                    userType,
                    firstName: req.firstName,
                    lastName: req.lastName,
                    email: req.email,
                })
            }
            else {
                const user = await User.findById(userId);
                if(user === null) {
                    throw new UserDoesNotExistError();
                }
                res.json(user);
            }
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find({});
            if (users.length === 0) {
                throw new NoUsersFoundError();
            }
            res.json(users);
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    getUserTypes(req, res) {
        try {
            res.json(DBConfig.USER_TYPES);
        } catch (error) {
            errorHandler.handleError(res, new UserTypeNotFoundError());
        }
    }

    async updateAllUserData(req, res) {
        const { _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street } = req.body;
        try {
            GenericValidator.validateObjectId(_id);
            UserValidator.validateUserData({ idNumber, firstName, lastName, userType, email, phoneNumber, city, street });
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { $set: { idNumber, firstName, lastName, userType, email, phoneNumber, city, street } },
                { new: true }
            );

            if (updatedUser === null) {
                throw new UserDoesNotExistError();
            }
            res.json(updatedUser);
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    async updateUser(req, res) {
        const { firstName, lastName, email, mobile: phoneNumber, city, street } = req.body;
        try {
            UserValidator.validateUpdateUserData({ firstName, lastName, email, phoneNumber, city, street });
            const updatedUser = await User.findByIdAndUpdate(
                req.userId,
                { $set: { firstName, lastName, email, phoneNumber, city, street } },
                { new: true }
            );
            if (updatedUser === null) {
                throw new UserDoesNotExistError();
            }
            res.json(updatedUser);
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    async changePassword(req, res) {
        const { oldPassword, password, passwordConfirm: confirmPassword } = req.body;
        try {
            AuthDataValidator.validateChangePasswordData({ oldPassword, password, confirmPassword });
            const userAuth = await UserAuth.findOne({ user: req.userId });
            if(!userAuth) {
                throw new UserDoesNotExistError();
            }

            const userHashedPassword = userAuth.hashedPassword;
            authUtils.verifyPassword(oldPassword, userHashedPassword);

            userAuth.hashedPassword = password;
            await userAuth.save();

            res.json({ msg: "password updated successfully" });
        }
        catch (error) {
            errorHandler.handleError(res, error);
        }
    }
}

const userController = new UserController();
export default userController;
