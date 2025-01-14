import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Cấu hình SMTP
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Sử dụng Gmail (hoặc SMTP khác nếu cần).
            port: 587, // Cổng SMTP (587 hoặc 465 cho SSL).
            secure: false, // False nếu dùng STARTTLS.
            auth: {
                user: process.env.SMTP_EMAIL, // Email SMTP của bạn.
                pass: process.env.SMTP_PASSWORD, // Mật khẩu ứng dụng SMTP.
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string, html: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"Film Recomend" <${process.env.SMTP_EMAIL}>`, // Địa chỉ email gửi đi.
                to, // Người nhận.
                subject, // Tiêu đề email.
                text, // Nội dung dạng text.
                html, // Nội dung dạng HTML.
            });
            console.log(`Email sent: ${info.messageId}`);
        } catch (error) {
            console.error(`Error sending email: ${error.message}`);
            throw new Error(`Unable to send email: ${error.message}`);
        }
    }
}
