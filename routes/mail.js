const express = require('express');
const app = express();
const mailRoutes = express.Router();
const nodemailer = require("nodemailer");

mailRoutes.route('/').post(function(req, res) {
    let sender_fio = req.body.fio;
    let sender_email = req.body.email;
    let sender_phone = req.body.phone;
    let sender_message = req.body.message;

    let transporter = nodemailer.createTransport({
        service: 'yandex',
        auth: {
            user: 'AsylovNikita@yandex.ru',
            pass: 'yandexLOVEme98'
        }
    });

    let mailOptions = {
        from: 'AsylovNikita@yandex.ru',
        to: sender_email,
        subject: 'Сообщение с Электронного расписания',
        text: 'От кого: ' + sender_fio + '\nНомер телефона: ' + sender_phone + '\nСообщение: ' + sender_message
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

module.exports = mailRoutes;