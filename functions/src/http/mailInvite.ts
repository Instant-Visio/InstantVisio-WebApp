import * as functions  from 'firebase-functions'
import * as nodemailer  from 'nodemailer'
import * as corsModule from 'cors'

const cors = corsModule({ origin: true, });

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

export const mailInvite =  functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== "POST") {
            res.status(405).send();
        } else {
            const email = req.body.mail;
            let html = req.body.html;
            const link = "https://google.com";

            const stringified = JSON.stringify(html);

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

            mailTransport.sendMail(mailOptions, (error) => {
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
