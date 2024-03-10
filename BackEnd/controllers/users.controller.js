<<<<<<< HEAD
import { NoUsersFoundError, NoJudgesFoundError, NoLawyersFoundError, UserTypeNotFoundError } from '../errors/user.error.js';
import errorHandler from '../errors/errorHandler.js'; 
import User from '../models/user.model.js'; 
import { dbConfig } from "../config.js";
=======
import UserValidator from "../validators/user.validate.js";
import User from "../models/user.model.js"
import { UserDoesNotExistError } from "../errors/user.error.js";
import GenericValidator from "../validators/generic.validate.js";
import errorHandler from "../errors/errorHandler.js";
>>>>>>> 6c3c035d4935c4f1b8874b50bf4bd48813fac906

class UserController {
    async getJudges(req, res) {
        try {
            const judges = await User.find({userType: 'Judge' });
            if (judges.length === 0) {
                throw new NoJudgesFoundError();
            }
            res.json(judges);
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    async getLawyers(req, res) {
        try {
            const lawyers = await User.find({userType: 'Lawyer' });
            if (lawyers.length === 0) {
                throw new NoLawyersFoundError();
            }
            res.json(lawyers);
        } catch (error) {
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
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }

    getUserTypes(req, res) {
        try {
            res.json(dbConfig.USER_TYPES);
        } catch (error) {
            errorHandler.handleError(res, new UserTypeNotFoundError());
        }
    }

    updateAllUserData(req, res) {
        res.status(404).send("Work In Progress!");
    }

   async updateUser(req, res) {
       const { _id, phoneNumber, city, street } = req.body
		try {
            GenericValidator.validateObjectId(_id);
			UserValidator.validateUserData({ phoneNumber, city, street });
			const updatedUser = await User.findByIdAndUpdate(_id, {$set: { phoneNumber, city, street }}, { new: true });
			if(updatedUser === null) {
				throw new UserDoesNotExistError();
			}
			res.json(updatedUser);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
    }
}

const userController = new UserController();
export default userController;
