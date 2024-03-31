import nodemailer from "nodemailer";
import Config from '../config.js';

class NodeMailerManager {
    constructor() {
        try {
            this.transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: Config.NODE_MAILER_EMAIL,
                    pass: Config.NODE_MAILER_SECRET,
                },
            });
        }
        catch(error) {
            console.log("Failed to Initialize Node MAiler Transporter");
            console.log(error);
        }
    }

    async sendEmail(toEmail, subject, text) {
        try {
            const mailOptions = {
                from: Config.NODE_MAILER_EMAIL,
                to: toEmail,
                subject: subject,
                text: text,
            };
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.error('Error sending email:');
            console.log(error);
        }
    }
}

const nodeMailerManager = new NodeMailerManager();
export default nodeMailerManager;
