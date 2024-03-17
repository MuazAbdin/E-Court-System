import nodeMailerManager from "../services/nodeMailer.service.js";
import twilioMessagesManager from "../services/twilio.service.js";

class NotificationsManager {
    sendEventNotifications(time, eventType, caseTitle, location, { email, phoneNumber }) {
        const message = `You have a ${eventType} event for The ${caseTitle} case\nLocation: ${location}\nTime: ${time}`;
        if(email) {
            nodeMailerManager.sendEmail(email, "Court Event Notification", message);
        }
        if(phoneNumber) {
            const globalPhoneNumber = "+972" + phoneNumber.slice(1);
            twilioMessagesManager.sendSMS(globalPhoneNumber, message);
            twilioMessagesManager.sendWhatsapp(globalPhoneNumber, message);
        }
    }
}

const notificationsManager = new NotificationsManager();
export default notificationsManager;