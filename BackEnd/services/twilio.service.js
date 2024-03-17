import twilio from "twilio";
import Config from "../config";

class TwilioMessagesManager {
    constructor() {
        this.client = twilio(Config.TWILIO_ACCOUNT_SID, Config.TWILIO_AUTH_TOKEN);
    }

    async sendSMS(phoneNumber, message) {
        try {
            await this.client.messages
                .create({
                    body: message,
                    to: phoneNumber,
                    from: Config.TWILIO_PHONE_NUMBER,
                })
        }
        catch(error) {
            console.log("Failed to send SMS:");
            console.log(error);
        }
    }

    sendWhatsapp(phoneNumber, message) {
        try {
            this.client.messages
            .create({
                body: message,
                from: "whatsapp:" + Config.TWILIO_PHONE_NUMBER,
                to: "whatsapp:" + phoneNumber
            })
        }
        catch(error) {
            console.log("Failed to send SMS:")
            console.log(error);
        };
    }
}

const twilioMessagesManager = new TwilioMessagesManager();
export default twilioMessagesManager;