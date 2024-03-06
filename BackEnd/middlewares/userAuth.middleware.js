import Config from "../config";

export function authorizationMiddleWare(req, res, next) {
    const token = req.cookies.token;
    try {
        const { userId } = jwt.verify(token, Config.JWT_SECRET_KEY);
        req.userId = userId;
        next();
    }
    catch(error) {
        res.status(401).send("Invalid JWT token!");
    }
}
