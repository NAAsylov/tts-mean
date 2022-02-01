const express = require('express');
const app = express();
const subjectRoutes = express.Router();

// МОДКЛЮЧЕНИЕ МОДЕЛИ
let SM = require('../models/subject');

// МАРШРУТ ДОБАВЛЕНИЯ
subjectRoutes.route('/add').post(function(req, res) {
    let Subject = new SM(req.body);
    Subject.save((err, isMatch) => {
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
subjectRoutes.route('/').get(function(req, res) {
    SM.find().sort({ NameSubject: 1 }).exec(function(err, Subject) {
        if (err) {
            console.log(err);
        } else {
            res.json(Subject);
        }
    });
});

// МАРШРУТ УДАЛЕНИЯ
subjectRoutes.route('/delete/:id').get(function(req, res) {
    SM.findByIdAndRemove({ _id: req.params.id }, function(err, Subject) {
        if (err) res.json(err);
        else res.json('Учебный предмет удален');
    });
});

module.exports = subjectRoutes;