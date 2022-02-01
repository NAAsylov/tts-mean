const express = require('express');
const app = express();
const classRoutes = express.Router();

// ПОДКЛЮЧЕНИЕ МОДЕЛИ
let NC = require('../models/number-class');

// МАРШРУТ ДОБАВЛЕНИЯ
classRoutes.route('/add').post(function(req, res) {
    let NumClass = new NC(req.body);
    NumClass.save((err, isMatch) => {
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
classRoutes.route('/').get(function(req, res) {
    NC.find().sort({ NumberClass: 1 }).exec(function(err, NumClass) {
        if (err) {
            console.log(err);
        } else {
            res.json(NumClass);
        }
    });
});

// МАРШРУТ УДАЛЕНИЯ
classRoutes.route('/delete/:id').get(function(req, res) {
    NC.findByIdAndRemove({ _id: req.params.id }, function(err, NumClass) {
        if (err) res.json(err);
        else res.json('Класс удален');
    });
});

module.exports = classRoutes;