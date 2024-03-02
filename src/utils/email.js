import nodemailer from "nodemailer"
import { config } from "dotenv";
config()
const sendEmail = async ({ to, cc, bcc, subject, text, html, attachments = [] } = {}) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });


    let info = await transporter.sendMail({
        from: `"Fred Foo" 👻 <${process.env.EMAIL}>`, // sender address
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments
    });


    return info.rejected.length ? false : true
}

console.log({
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
})


export default sendEmail

