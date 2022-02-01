const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
const callRoute = require('./routes/call.route');
const general_scheduleRoute = require('./routes/general-schedule.route');
const number_classRoute = require('./routes/num-class');
const subjectRoute = require('./routes/subjects.route');
const days_studyRoute = require('./routes/days_study.route');
const postRoute = require('./routes/post');
const historyRoute = require('./routes/history.route');
const mailRoute = require('./routes/mail');

const app = express();

const port = process.env.PORT || 8080;
//const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// ПОДКЛЮЧЕНИЕ К БД
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

//УСПЕШНОЕ ПОДКЛЮЧЕНИЕ
mongoose.connection.on('connected', () => {
    console.log("Мы успешно подключились к БД");
});

// ПОДКЛЮЧЕНИЕ НЕ ВЫПОЛНЕНО
mongoose.connection.on('error', (err) => {
    console.log("Мы не подключились к БД: " + err);
});

app.get('/', (req, res) => {
    res.send('Главная страница сайта!!!!!');
});

app.use('/account', account);
app.use('/call-schedule', callRoute);
app.use('/general-schedule', general_scheduleRoute);
app.use('/number-class', number_classRoute);
app.use('/subject', subjectRoute);
app.use('/days-study', days_studyRoute);
app.use('/post', postRoute);
app.use('/about-school', historyRoute);
app.use('/mail', mailRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log("Сервер был запущен по порту: " + port);
});