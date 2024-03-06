import errorHandler from "../errors/errorHandler.js";
import { NoUserTypesFoundError, UserTypeDoesNotExistError } from "../errors/userType.error.js";
import UserType from "../models/userType.model.js";
import UserTypesValidator from "../validators/userTypes.validate.js";

class UserTypesController {
    async createUserType(req, res) {
        const { userType } = req.body;
        try {
            UserTypesValidator.validateUserType(userType);
            const newUserType = await UserType.create({ userType });
            res.send(newUserType);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async getAllUserTypes(req, res) {
        try {
            const userTypes = await UserType.find();
            if(userTypes.length === 0) {
                throw new NoUserTypesFoundError();
            }
            res.send(userTypes);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    async updateUserType(req, res) {
        const { id, userType } = req.body;
        try {
            const updatedUserType = await UserType.findByIdAndUpdate(id, {userType}, { new: true});
            if(updatedUserType === null) {
                throw new UserTypeDoesNotExistError();
            }
            res.send(updatedUserType);
        }
        catch(error) {
            errorHandler.handleError(res, error);
        }
    }

    deleteUserType(req, res) {
        res.status(404).send("Work In Progress!");
    }
}

const userTypesController = new UserTypesController();
export default userTypesController;