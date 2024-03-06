import * as caseErrors from "./case.error.js";
import * as caseStatusTypeErrors from "./caseStatusType.error.js";
import * as courtErrors from "./court.error.js";
import * as dataValidationErrors from "./dataValidation.error.js";
import * as doucmentErrors from "./document.error.js";
import * as eventErrors from "./event.error.js";
import * as eventTypeErrors from "./eventType.error.js";
import * as partyErrors from "./party.error.js";
import * as stakeholdersErrors from "./stakeholders.error.js";
import * as userErrors from "./user.error.js";
import * as userAuthErrors from "./userAuth.error.js";
import * as userTypeErrors from "./userType.error.js";

class ErrorHandler {
    constructor() {
        this.errors = {
            ...caseErrors,
            ...caseStatusTypeErrors,
            ...courtErrors,
            ...dataValidationErrors,
            ...doucmentErrors,
            ...eventErrors,
            ...eventTypeErrors,
            ...partyErrors,
            ...stakeholdersErrors,
            ...userErrors,
            ...userAuthErrors,
            ...userTypeErrors,
        };
    }

    handleError(res, error) {
        console.log("Error:", error);

        const errorType = error.constructor.name;
        if(this.errors[errorType]) {
            return res
                .status(this.errors[errorType].statusCode)
                .send(this.errors[errorType].msg);
        }
        res.status(500).send("Server Error!")
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;