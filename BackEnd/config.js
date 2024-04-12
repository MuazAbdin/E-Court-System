import { config } from "dotenv";
config();

export default class Config {
    
    static FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
    static PORT = process.env.PORT || 4000;
    static DB_URL = process.env.DB_URL || "mongodb://127.0.0.1/justice-overseer";
    static HASH_PASSWORD_SALT_ROUNDS = process.env.HASH_PASSWORD_SALT_ROUNDS || 10;
    static JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "1234";
    static JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || 60 * 60 * 24 * 7;
    static TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
    static TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
    static TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "";
    static TWILIO_WHATSAPP_PHONE_NUMBER = process.env.TWILIO_WHATSAPP_PHONE_NUMBER || "";
    
    static NODE_MAILER_EMAIL = process.env.NODE_MAILER_EMAIL || "";
    static NODE_MAILER_SECRET = process.env.NODE_MAILER_SECRET || "";

    static FIREBASE_USER = process.env.FIREBASE_USER || "";
    static FIREBASE_AUTH = process.env.FIREBASE_AUTH || "";
    static FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "";
    static FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || "";
    static FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "";
    static FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || "";
    static FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID || "";
    static FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || "";
}

export class DBConfig {
    static STAKEHOLDER_TYPES = [ "Client", "Witness" ];
    static PARTY_NAMES = [ "Claimant", "Respondent" ];
    static USER_TYPES = ['Judge', 'Lawyer', 'Admin', 'Court Manager'];
    static CASE_STATUS_TYPES = ["Pending", "Active", "Dismissed", "Settled", "Appealed"];
    static EVENT_TYPES = ['General', 'Trial', 'Appeal', 'Hearing'];
}
