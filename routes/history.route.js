const express = require('express');
const app = express();
const historyRoutes = express.Router();

// ПОДКЛЮЧЕНИЕ МОДЕЛИ
let History = require('../models/history');

// МАРШРУТ ПОЛУЧЕНИЯ ВСЕХ
historyRoutes.route('/').get(function(req, res) {
    History.find(function(err, history) {
        if (err) {
            res.json({ success: false });
        } else {
            res.json(history);
        }
    });
});

// МАРШРУТ ИЗМЕНЕНИЯ
historyRoutes.route('/edit/:id').get(function(req, res) {
    let id = req.params.id;
    History.findById(id, function(err, history) {
        res.json(history);
    });
});

// МАРШРУТ ОБНОВЛЕНИЯ
historyRoutes.route('/update/:id').post(function(req, res) {
    History.findById(req.params.id, function(err, history) {
        if (!history)
            res.status(404).send("История школы не найдена");
        else {
            history.description = req.body.description;
            history.save().then(history => {
                    res.json('Обновление выполнено');
                })
                .catch(err => {
                    res.status(400).send("Не удалось обновить историю");
                });
        }
    });
});

module.exports = historyRoutes;