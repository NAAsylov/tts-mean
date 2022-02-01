const express = require('express');
const app = express();
const gsRoutes = express.Router();

// ПОДКЛЮЧЕНИЕ МОДЕЛИ
let GS = require('../models/general-schedule');

// МАРШРУТ ДОБАВЛЕНИЯ
gsRoutes.route('/add').post(function(req, res) {
    let gs = new GS(req.body);
    gs.save((err, isMatch) => {
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
gsRoutes.route('/').get(function(req, res) {
    GS.find().sort({ NumberLesson: 1 }).exec(function(err, gs) {
        if (err) {
            console.log(err);
        } else {
            res.json(gs);
        }
    });
});

// МАРШРУТ ИЗМЕНЕНИЯ
gsRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    GS.findById(id, function(err, gs) {
        res.json(gs);
    });
});

// МАРШРУТ ОБНОВЛЕНИЯ
gsRoutes.route('/update/:id').post(function(req, res) {
    GS.findById(req.params.id, function(err, gs) {
        if (!gs)
            res.status(404).send("Такого урока нет");
        else {
            gs.NumberLesson = req.body.NumberLesson;
            gs.DayLesson = req.body.DayLesson;
            gs.ClassLesson = req.body.ClassLesson;
            gs.NameLesson = req.body.NameLesson;

            gs.save().then(gs => {
                    res.json('Изменение выполнено');
                })
                .catch(err => {
                    res.status(400).send("Не удалось внести изменения");
                });
        }
    });
});

// МАРШРУТ УДАЛЕНИЯ
gsRoutes.route('/delete/:id').get(function(req, res) {
    GS.findByIdAndRemove({ _id: req.params.id }, function(err, gs) {
        if (err) res.json(err);
        else res.json('Урок удален');
    });
});

module.exports = gsRoutes;