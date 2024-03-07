import { NoUsersFoundError, NoJudgesFoundError, NoLawyersFoundError } from '../errors/user.error.js';
import errorHandler from '../errors/errorHandler.js'; 
import User from '../models/user.model.js'; 
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


    updateAllUserData(req, res) {
        res.status(404).send("Work In Progress!");
    }

    updateUser(req, res) {
        res.status(404).send("Work In Progress!");
    }
}

const userController = new UserController();
export default userController;