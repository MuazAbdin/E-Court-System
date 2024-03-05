import mongoose, { mongo } from "mongoose";

class DBManager {
    dbConnect(DB_URL) {
        return mongoose.connect(DB_URL);
    }

    dbDisconnect() {
        return mongoose.connection.close();
    }
}

const dbManager = new DBManager();
export default dbManager;