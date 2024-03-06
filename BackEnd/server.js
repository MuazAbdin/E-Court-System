import app from "./app.js";
import Config from "./config.js";
import dbManager from "./utils/dbManager.js";

main();

async function main() {
    let dbConnected = false;
    while(!dbConnected) {
        try {
            await dbManager.dbConnect(Config.DB_URL);
            console.log("Successfully connected to Database!")
            dbConnected = true;
        }
        catch(error) {
            console.log("Failed to connect to Database:", error);
        }
    }

    app.listen(Config.PORT, () => {
        console.log("Server is listening on port", Config.PORT);
    })
}