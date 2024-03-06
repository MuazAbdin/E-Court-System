import Config from "../config";

class AuthUtils {
    static createTokenCookie(payload) {
        const token = this.generateJWT(payload);
        const tokenCookie = serialize("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })
        return tokenCookie;
    }

    createJWT(payload) {
        return jwt.sign(payload, Config.JWT_SECRET_KEY, {
            expiresIn: Config.JWT_EXPIRE_TIME
        })
    }

    verifyJWT(password, hashedPassword) {
        // TODO - Throw error if the virification fails
        return bcrypt.compareSync(password, hashedPassword);
    }

    hashPassword(password) {
        const saltRounds = Config.HASH_PASSWORD_SALT_ROUNDS;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }
}

const authUtils = new AuthUtils();
export default authUtils;
