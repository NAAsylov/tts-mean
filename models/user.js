const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// МОДЕЛЬ ПОЛЬЗОВАТЕЛЯ
const UserSchema = mongoose.Schema({
    login: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true }
}, {
    collection: 'users'
});
const User = module.exports = mongoose.model('User', UserSchema);

// ПОЛУЧИТЬ СПИСОК ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ИЗ БД
module.exports.getUser = function(callback) {
    User.find(callback);
};

// ПОИСК ПОЛЬЗОВАТЕЛЯ В БД ПО ЛОГИНУ
module.exports.getUserByLogin = function(login, callback) {
    const query = { login: login };
    User.findOne(query, callback);
};

// ПОИСК ПОЛЬЗОВАТЕЛЯ В БД ПО ID
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

// ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ В БД
module.exports.addUser = function(newUser, callback) {
    const query = { login: newUser.login };
    User.findOne(query, (err, isMatch) => {
        if (err) {
            throw err;
        } else {
            if (isMatch) {
                callback(null, null);
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save(callback);
                    });
                });
            }
        }
    });
};

// ПОИСК ПАРОЛЯ В БД
module.exports.comparePass = function(passFromUser, userDBPass, callback) {
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

// ОБНОВЛЕНИЕ ДОКУМЕНТА В БД
module.exports.updateUserByLogin = function(login, newUser, callback) {
    User.findOneAndUpdate({ login: login }, { $set: newUser }, { strict: false, new: true }, callback);
};