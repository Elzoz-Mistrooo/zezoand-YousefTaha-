import nodemailer from "nodemailer"

const sendEmail = async ({ to, cc, bcc, subject, html, attachments = [] } = {}) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "zezoelmalky894@gmail.com",
            pass: "tndsbcrleflxeeme",
        }
    });


    let info = await transporter.sendMail({
        from: `"Fred Foo" 👻 <${process.env.EMAIL}>`, // sender address
        to,
        cc,
        bcc,
        subject,
        html,
        attachments
    });


    return info.rejected.length ? false : true
}



export default sendEmail

