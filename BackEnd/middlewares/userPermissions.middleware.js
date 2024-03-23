// import { StatusCodes } from "http-status-codes";
// import AccessConfig from "../config.js";
import User from "../models/user.model.js";
import errorHandler from "../errors/errorHandler.js";
import { UserDoesNotExistError } from "../errors/user.error.js";
import { NotAuthorizedError } from "../errors/userAuth.error.js";

const PERMISSIONS_TABLE = {
    "GET": {
        /* ----- Case routes ----- */
        "/cases/": ["Court Manager", "Admin"],
        "/cases/user/": ["Lawyer", "Judge"],
        "/cases/pending/": ["Court Manager", "Admin"],
        "/cases/public/": ["Visitor", "Lawyer", "Judge", "Court Manager", "Admin"],
        "/cases/param/": ["Visitor", "Court Manager", "Lawyer", "Judge", "Admin"],
        /* ----- Case Respond routes ----- */
        "/case-responds/": ["Court Manager", "Admin"],
        /* ----- Courts routes ----- */
        "/courts/": ["Visitor", "Lawyer", "Judge", "Court Manager", "Admin"],
        "/courts/param/": ["Visitor", "Lawyer", "Judge", "Court Manager", "Admin"],
        /* ----- Document routes ----- */
        "/documents/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/documents/user/param/": ["Court Manager", "Admin"],
        "/documents/party/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/documents/case/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/documents/download/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        /* ----- Event routes ----- */
        "/events/case/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/events/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/events/upcoming/": ["Lawyer", "Judge"],
        /* ----- Party routes ----- */
        "/parties/case/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/parties/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        /* ----- Stakeholder routes ----- */
        "/stakeholders/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/stakeholders/party/param/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        /* ----- User routes ----- */
        "/users/judges/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/users/lawyers/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/users/": ["Admin"],
        "/users/user/": ["Visitor", "Lawyer", "Judge", "Court Manager", "Admin"],
    },
    "POST": {
        /* ----- Case routes ----- */
        "/cases/": ["Court Manager", "Admin"],
        "/cases/file-a-case/": ["Lawyer"],
        /* ----- Case Respond routes ----- */
        "/case-responds/": ["Lawyer"],
        /* ----- Courts routes ----- */
        "/courts/": ["Court Manager", "Admin"],
        /* ----- Document routes ----- */
        "/documents/": ["Lawyer"],
        /* ----- Event routes ----- */
        "/events/": ["Court Manager", "Admin"],
        /* ----- Party routes ----- */
        "/parties/": ["Court Manager", "Admin"],
        /* ----- Stakeholder routes ----- */
        "/stakeholders/": ["Court Manager", "Admin", "Lawyer"],
    },
    "PATCH": {
        /* ----- Case routes ----- */
        "/cases/": ["Court Manager", "Admin", "Judge", "Lawyer"],
        "/cases/status/": ["Court Manager", "Judge", "Admin"],
        "/cases/resolve-pending/": ["Court Manager", "Admin"],
        /* ----- Case Respond routes ----- */
        "/case-responds/review/": ["Court Manager", "Admin"],
        /* ----- Document routes ----- */
        "/documents/": ["Lawyer", "Court Manager", "Admin"],
        /* ----- Event routes ----- */
        "/events/": [, "Admin"],
        /* ----- Party routes ----- */
        "/parties/": ["Court Manager", "Admin"],
        /* ----- User routes ----- */
        "/users/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        "/users/password/": ["Lawyer", "Judge", "Court Manager", "Admin"],
    },
    "PUT": {
        /* ----- Courts routes ----- */
        "/courts/": ["Court Manager", "Admin"],
        /* ----- Stakeholder routes ----- */
        "/stakeholders/": ["Court Manager", "Admin"],
        /* ----- User routes ----- */
        "/users/": ["Admin"],
    },
    "DELETE": {
        /* ----- Event routes ----- */
        "/events/": ["Lawyer", "Judge", "Court Manager", "Admin"],
        /* ----- Party routes ----- */
        "/parties/": ["Court Manager", "Admin"],
        /* ----- Stakeholder routes ----- */
        "/stakeholder/": ["Court Manager", "Admin"],
    }
}

export async function permissionsMiddleWare(req, res, next) {
    const userId = req.userId;
    try {
        const user = req.userType ? null : await User.findById(userId);
        if(!req.userType && user === null) {
            res.clearCookie("token");
            throw new UserDoesNotExistError();
        }
        else if(!req.userType) {
            req.userType = user.userType;
        }
        const userType = req.userType;

        const url = createUrl(req.originalUrl, req.params);
        if(!PERMISSIONS_TABLE[req.method][url].includes(userType)) {
            throw new NotAuthorizedError();
        }
        next();
    } catch (error) {
        errorHandler.handleError(res, error);
    }
}

function createUrl(url, params) {
    Object.keys(params)
        .forEach(p => {
            url = url.replace(params[p], "param")
        });
    if(url.slice(-1) !== "/") {
        url += "/";
    }
    const queryIdx = url.indexOf("?");
    if(queryIdx !== -1)
        url = url.slice(0, queryIdx);
    return url;
}
