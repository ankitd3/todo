const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin:true});
admin.initializeApp(functions.config().firebase);
// const SENDGRID_API_KEY = functions.config().sendgrid.key

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(SENDGRID_API_KEY);


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ankit.dalal488@gmail.com',
        pass: ''
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;
        const sub = req.query.sub;
        const html = req.query.html;


        const mailOptions = {
            from: 'Ankit Dalal <ankit.dalal488@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: sub, // email subject
            html: html // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});



//exports.sendMail = functions.https.onRequest((request, responde) => {});
