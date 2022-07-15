const nodemailer = require('nodemailer');
//nodemailer for email services. 
//if we provide html then text will be ignored.
//These are secure values so store them in dot env.
// these details come from SMTP service provider.
// here we used sendinblue.
const SMTP_HOST='smtp-relay.sendinblue.com';
const MAIL_USER= 'rishavgupta88087747@gmail.com';
const MAIL_PASS= 'rBPbgED9kyFZ510t';


//sendMail is a function which is exported.
//createTransport is a method of nodemailer to setup credentials.
//to send mail we need to call senMail method of nodemailer.
async function sendMail ({ from, to ,subject, text ,html }) {
    let transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: 587,
        secure: false,
        auth : {
            user: MAIL_USER,
            pass: MAIL_PASS
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