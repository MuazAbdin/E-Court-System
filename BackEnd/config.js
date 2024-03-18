import { config } from "dotenv";
config();

export default class Config {
    
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
}

export class DBConfig {
    static STAKEHOLDER_TYPES = [ "Client", "Witness" ];
    static PARTY_NAMES = [ "Claimant", "Respondent" ];
    static USER_TYPES = ['Judge', 'Lawyer', 'Admin', 'Court Manager'];
    static CASE_STATUS_TYPES = ["Pending", "Active", "Dismissed", "Settled", "Appealed"];
    static EVENT_TYPES = ['General', 'Trial', 'Appeal', 'Hearing'];
}
