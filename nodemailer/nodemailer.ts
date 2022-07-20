const nodemailer = require('nodemailer');
//const transport = nodemailer.createTransport(transport[defaults]);
const transporter= nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt@example.com',
    port : '587',
    //connectionTimeout : '1',
    auth: {
        type : 'OAUTH2',
        user: "ritikb13kt",
        pass: "KocharKaAccount",
        clientId : "538275038705-m9e32ohtsufns8ahiosn80at3goclhg7.apps.googleusercontent.com",
        refreshToken : "1//04pE0bfoN-VzeCgYIARAAGAQSNwF-L9IrBhCotWKX4p1rnjNA4ZJQvp3GfsZBqW0AT0iUpU-vqVSRjPrumth2WoXftUS1BTR4lIc",
        clientSecret : "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"
    },
    authMethod:'PLAIN'
})
var message = {
    from: "ritikb13kt@gmail.com",
    to: "ritik.proton@proton.me",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
    attachments : [
        {   // file on disk as an attachment
            filename: 'text3.txt',
            path: 'index.js' // stream this file
        }
    ]
  }; 
export function SendMailFunc(message:any,func:any){
    transporter.sendMail(message,func);
}