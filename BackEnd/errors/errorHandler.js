import CustomError from "./customError.error.js";

class ErrorHandler {
    handleError(res, error) {
        if(error instanceof CustomError) {
            return res
            .status(error.statusCode)
            .send(error.msg);
        }
        console.log("Error:", error);
        res.status(500).send("Server Error!")
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;