class UserController {
    async getJudges(req, res) {
        try {
            const judges = await User.find({ role: 'judge' });
            if (judges.length === 0) {
                return res.status(404).send("Work In Progress!");
            }
            res.json(judges);
        } catch (error) {
            errorHandler.handleError(res, error);
        }
    }

       async getLawyers(req, res) {
        try {
            const lawyers = await User.find({ role: 'lawyer' });
            if (lawyers.length === 0) {
                return res.status(404).send("Work In Progress!");
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
               
                return res.status(404).send("Work In Progress!");
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