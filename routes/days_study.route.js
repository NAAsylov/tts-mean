const express = require('express');
const app = express();
const daysRoutes = express.Router();

// ПОДКЛЮЧЕНИЕ МОДЕЛИ ЗВОНКОВ УРОКОВ
let DS = require('../models/day_study');

// МАРШРУТ ДОБАВЛЕНИЯ
daysRoutes.route('/add').post(function(req, res) {
    let DayStudy = new DS(req.body);
    DayStudy.save((err, isMatch) => {
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
daysRoutes.route('/').get(function(req, res) {
    DS.find().sort().exec(function(err, DayStudy) {
        if (err) {
            console.log(err);
        } else {
            res.json(DayStudy);
        }
    });
});

// МАРШРУТ УДАЛЕНИЯ
daysRoutes.route('/delete/:id').get(function(req, res) {
    DS.findByIdAndRemove({ _id: req.params.id }, function(err, DayStudy) {
        if (err) res.json(err);
        else res.json('Учебный день удален');
    });
});

module.exports = daysRoutes;