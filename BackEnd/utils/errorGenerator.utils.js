import StatusCodes from "http-status-codes";

class ErrorGenerator {
    noDataErrorGenerator(dataTypeName) {
        return class extends Error {
            static msg = `No ${dataTypeName} found.`;
            static statusCode = StatusCodes.NOT_FOUND;
        };
    } 
}

const errorGenerator = new ErrorGenerator();
export default errorGenerator;