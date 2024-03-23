import nodeMailerManager from "../services/nodeMailer.service.js";
import twilioMessagesManager from "../services/twilio.service.js";

class NotificationsManager {
    sendEventNotifications(time, eventType, eventDescription, caseTitle, location, recipients) {
        const message = `You have a ${eventType} event for The ${caseTitle} case\nLocation: ${location}\nTime: ${time}\nDescription: ${eventDescription}`;
        const stakeholderMessage = `You are invited to a ${eventType} event for The ${caseTitle} case\nLocation: ${location}\nTime: ${time}\nDescription: ${eventDescription}`;
        for(const recipient of recipients) {
            const sendMsg = recipient.type === "stakeholder"  ? stakeholderMessage : message;
            if(recipient.email) {
                nodeMailerManager.sendEmail(recipient.email, "Court Event Notification", sendMsg);
            }
            if(recipient.phoneNumber) {
                const globalPhoneNumber = "+972" + recipient.phoneNumber.slice(1);
                twilioMessagesManager.sendSMS(globalPhoneNumber, sendMsg);
                twilioMessagesManager.sendWhatsapp(globalPhoneNumber, sendMsg);
            }
        }
    }
}

const notificationsManager = new NotificationsManager();
export default notificationsManager;