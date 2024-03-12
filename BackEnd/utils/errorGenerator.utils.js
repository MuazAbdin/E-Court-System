import StatusCodes from "http-status-codes";
import CustomError from "../errors/customError.error.js";

class ErrorGenerator {
  noDataErrorGenerator(dataTypeName) {
    return this.createErrorClass(
      `No ${dataTypeName} found!`,
      StatusCodes.NOT_FOUND
    );
  }

  itemDoesNotExistErrorGenerator(itemTypeName) {
    return this.createErrorClass(
      `${itemTypeName} does not exist!`,
      StatusCodes.NOT_FOUND
    );
  }

  invalidValueErrorGenerator(valueTypeName) {
    return this.createErrorClass(
      `Invalid ${valueTypeName}!`,
      StatusCodes.BAD_REQUEST
    );
  }

  createErrorClass(msg, statusCode) {
    return class extends CustomError {
      constructor() {
        super();
        this.msg = msg;
        this.statusCode = statusCode;

        // Object.setPrototypeOf(this, CustomError.prototype);
      }
    };
  }
}

const errorGenerator = new ErrorGenerator();
export default errorGenerator;
