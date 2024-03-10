import UserValidator from "../validators/users.validate.js";
import User from "../models/user.model.js"
import { UserDoesNotExistError } from "../errors/user.error.js";
import GenericValidator from "../validators/generic.validate.js";
import errorHandler from "../errors/errorHandler.js";

class UserController {
    getJudges(req, res) {
        res.status(404).send("Work In Progress!");
    }

    getLawyers(req, res) {
        res.status(404).send("Work In Progress!");
    }

    getUsers(req, res) {
        res.status(404).send("Work In Progress!");
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