require('dotenv').config();
const nodemailer = require('nodemailer');
//nodemailer for email services. 
//if we provide html then text will be ignored.
//These are secure values so store them in dot env.
// these details come from SMTP service provider.
// here we used sendinblue.



//sendMail is a function which is exported.
//createTransport is a method of nodemailer to setup credentials.
//to send mail we need to call senMail method of nodemailer.
async function sendMail ({ from, to ,subject, text ,html }) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth : {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }

    });

    let info = await transporter.sendMail({
            from : `fileshare <${from}>`,
            to,
            subject,
            text,
            html 
    });


    //console.log(info);
}


module.exports = sendMail;
