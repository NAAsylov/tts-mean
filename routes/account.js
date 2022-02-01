const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

// МАРШРУТ ПРИ РЕГИСТРАЦИИ
router.post('/register', (req, res) => {
    console.log(req.body)
    let newUser = new User({
        login: req.body.username,
        password: req.body.password,
        role: 'User'
    });

    User.addUser(newUser, (err, user) => {
        if (err)
            res.json({ success: false, msg: "Пользователь не был добавлен" });
        else {
            if (user) {
                res.json({ success: true, msg: "Пользователь был добавлен!" });
            } else {
                res.json({ success: false, msg: "Пользователь с таким логином уже существует!" });
            }
        }
    });
});

// МАРШРУТ ПРИ АВТОРИЗАЦИИ
router.post('/login', (req, res) => {
    const login = req.body.username;
    const password = req.body.password;

    User.getUserByLogin(login, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({ success: false, msg: "Такой пользователь не найден" });

        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 3600 * 24
                });

                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: user
                });
            } else
                return res.json({ success: false, msg: "Пароли не совпадают" });
        });
    });
});

// МАРШРУТ ДЛЯ ПОЛУЧЕНИЯ СПИСОКА ПОЛЬЗОВАТЕЛЕЙ
router.get('/users', (req, res) => {
    User.getUser((err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "Пользователи не найдены" });
        } else {
            res.json({ success: true, user: user });
        }
    });
});

// МАРШРУТ ДЛЯ ПОЛУЧЕНИЯ ПОЛЬЗОВАТЕЛЯ ПО ID
router.get('/users/:id', (req, res) => {
    User.getUserById(req.params.id, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "Пользователь с таким id не найден" });
        } else {
            res.json({ success: true, user: user });
        }
    });
});

// МАРШРУТ ДЛЯ ОБНОВЛЕНИЯ ПОЛЬЗОВАТЕЛЯ ПО LOGIN
router.post('/update', (req, res) => {
    User.updateUserByLogin(req.body.login, req.body, (err, user) => {
        if (err) {
            res.json({ success: false, msg: "Данные не обновлены" })
        } else {
            res.json({ success: true, msg: "Данные обновлены" })
        }
    });
});

// МАРШРУТ В КАБИНЕТ ПОЛЬЗОВАТЕЛЯ
router.get('/user-account', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Кабинет пользователя');
});

module.exports = router;