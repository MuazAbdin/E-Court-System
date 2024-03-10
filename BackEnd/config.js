export default class Config {
    static PORT = 4000;
    static DB_URL = "mongodb://127.0.0.1/justice-overseer";
    static HASH_PASSWORD_SALT_ROUNDS = 10;
    static JWT_SECRET_KEY = "1234";
    static JWT_EXPIRE_TIME = 60 * 60 * 24 * 7;
}

export class dbConfig {
    static USER_TYPES = ['Judge', 'Lawyer', 'Admin', 'Secretary'];
    static CASE_STATUS_TYPES = ['Created', 'Closed'];
    static EVENT_TYPES = ['General', 'Trial', 'Appeal', 'Hearing'];
}
