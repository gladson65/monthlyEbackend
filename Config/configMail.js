// import nodemailer from 'nodemailer';
import fetch from "node-fetch";
import env from 'dotenv';
env.config();

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.sendinblue.com",
//     port: 465,   
//     secure: true,        
//     auth: {
//         user: process.env.BREVO_EMAIL,
//         password: process.env.BREVO_PASSWORD
//     },
//     tls: { rejectUnauthorized: false }
// })

// transporter.verify(function(error, success) {
//     if (error) {
//         console.log("Mail config error:", error);
//     } else {
//         console.log("Mail server ready");
//     }
// });

// export default transporter;

function sendOTP() {
    let email = 'grauth65@gmail.com';
    const data = {
        sender: { name: "MyApp", email: process.env.BREVO_EMAIL },
        to: [{ email }],
        subject: "OTP Verification",
        htmlContent: `<p>Your OTP is <b>12345</b></p>`
    };

    return fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "api-key": process.env.BREVO_PASSWORD,
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => 
        console.log(res.json())
    );
}

sendOTP();