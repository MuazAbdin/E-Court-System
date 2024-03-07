import StatusCodes from "http-status-codes";

class ErrorGenerator {
    noDataErrorGenerator(dataTypeName) {
        return this.createErrorClass(`No ${dataTypeName} found!`, StatusCodes.NOT_FOUND)
    }

    itemDoesNotExistErrorGenerator(itemTypeName) {
        return this.createErrorClass(`${itemTypeName} does not exist!`, StatusCodes.NOT_FOUND);
    }

    invalidValueErrorGenerator(valueTypeName) {
        return this.createErrorClass(`Invalid ${valueTypeName}!`, StatusCodes.BAD_REQUEST);
    }

    createErrorClass(msg, statusCode) {
        return class extends Error {
            static msg = msg;
            static statusCode = statusCode;
        }
    };
}

const errorGenerator = new ErrorGenerator();
export default errorGenerator;