const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true, });

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: functions.config().gmail.auth.type,
        user: functions.config().gmail.user,
        clientId: functions.config().gmail.auth.client.id,
        clientSecret: functions.config().gmail.auth.client.secret,
        refreshToken: functions.config().gmail.auth.client.refreshtoken
    }
});

exports.mailInvite = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== "POST") {
            res.status(405).send();
        } else {
            var email = req.body.mail;
            var html = req.body.html;
            var link = "https://google.com";

            var stringified = JSON.stringify(html);

            stringified.replace('LINK_TOKEN', link);
            stringified.replace('LINK_TOKEN', link);

            html = JSON.parse(stringified);

            const mailOptions = {
                from: 'Urgence Proches <instantvisioapp@gmail.com>',
                to: email,
                subject: 'Demande URGENTE de visiophonie de votre proche',
                text: 'Demande URGENTE de visiophonie de votre proche',
                html: html
            };

            mailTransport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    mailTransport.close();
                    res.status(500).send({ status: 'Failure', message: 'Mail not sent: ' + error.message });
                } else {
                    console.log('New welcome email sent to:', email);
                    mailTransport.close();
                    res.status(200).send({ status: 'Success', message: 'Mail sent' });
                }
            });
        }
    });
});
