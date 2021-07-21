const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess = {
        secret: 'Super secret secret',
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
                db: sequelize
        })
};

app.use(session(sess));

//const { Sequelize } = require('sequelize/types');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use apiRoutes
app.use(require('./controllers/'));

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
        app.listen(PORT, () => console.log('Now listening'));
});





