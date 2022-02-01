const express = require('express');
const app = express();
const callRoutes = express.Router();

// ПОДКЛЮЧЕНИЕ МОДЕЛИ
let Call = require('../models/call');

// МАРШРУТ ДОБАВЛЕНИЯ
callRoutes.route('/add').post(function(req, res) {
    let call = new Call(req.body);
    call.save((err, isMatch) => {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            console.log('Успешно');
            res.json({ success: true });
        }
    });
});

// МАРШРУТ ПОЛУЧЕНИЯ ВСЕХ
callRoutes.route('/').get(function(req, res) {
    Call.find().sort({ NumberLesson: 1 }).exec(function(err, call) {
        if (err) {
            res.json({ success: false });
        } else {
            res.json(call);
        }
    });
});

// МАРШРУТ ИЗМЕНЕНИЯ
callRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    Call.findById(id, function(err, call) {
        res.json(call);
    });
});

// МАРШРУТ ОБНОВЛЕНИЯ
callRoutes.route('/update/:id').post(function(req, res) {
    Call.findById(req.params.id, function(err, call) {
        if (!call)
            res.status(404).send("Звонков для данного урока нет");
        else {
            call.NumberLesson = req.body.NumberLesson;
            call.StartLesson = req.body.StartLesson;
            call.EndLesson = req.body.EndLesson;

            call.save().then(call => {
                    res.json('Обновление выполнено');
                })
                .catch(err => {
                    res.status(400).send("Не удалось обновить звонки");
                });
        }
    });
});

// МАРШТУР УДАЛЕНИЯ
callRoutes.route('/delete/:id').get(function(req, res) {
    Call.findByIdAndRemove({ _id: req.params.id }, function(err, call) {
        if (err) res.json(err);
        else res.json('Звонки для урока удалены');
    });
});

module.exports = callRoutes;