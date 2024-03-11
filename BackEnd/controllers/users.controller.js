import { UserDoesNotExistError, NoUsersFoundError, NoJudgesFoundError, NoLawyersFoundError, InvalidUserTypeError } from '../errors/user.error.js';
import errorHandler from "../errors/errorHandler.js"; 
import User from "../models/user.model.js";
import { dbConfig } from "../config.js";
import UserValidator from "../validators/user.validate.js";
import GenericValidator from "../validators/generic.validate.js";

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

   async updateAllUserData(req, res) {
          const { _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street } = req.body;
		try {
            GenericValidator.validateObjectId(_id);
			UserValidator.validateUserData({ idNumber, firstName, lastName, userType, email, phoneNumber, city, street });
			const updatedUser = await User.findByIdAndUpdate(_id,
				{$set: { idNumber, firstName, lastName, userType, email, phoneNumber, city, street }},
				{ new: true });
			if(updatedUser === null) {
				throw new UserDoesNotExistError();
			}
			res.json(updatedUser);
		}
		catch(error) {
			errorHandler.handleError(res, error);
		}
    }
    

   async updateUser(req, res) {
       const { _id, phoneNumber, city, street } = req.body
		try {
			UserValidator.validateUpdateUserData({ phoneNumber, city, street });
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
