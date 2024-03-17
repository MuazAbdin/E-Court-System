import nodemailer from "nodemailer";
import Config from '../config';

class NodeMailerManager {
    static async sendEmail(toEmail, subject, text) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: Config.NODE_MAILER_EMAIL, 
                    pass: Config.NODE_MAILER_SECRET, 
                },
            });
    
            const mailOptions = {
                from: Config.NODE_MAILER_EMAIL,
                to: toEmail,
                subject: subject,
                text: text,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${toEmail}`);
        } catch (error) {
            console.error('Error sending email:');
            console.log(error);
        }
    }
}

module.exports = NodeMailerManager;
