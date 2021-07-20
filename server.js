const express = require('express');
const db = require('./config/connection');
const apiRoutes = require('./routes/apiRoutes');
//const path = require('path');
//const exphbs = require('express-handlebars');
//const { Sequelize } = require('sequelize/types');
//const hbs = exphbs.create({});

const PORT = process.env.PORT || 3001;
const app = express();


//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

// Express middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// app.use(express.static(path.join(__dirname, 'public')));

// Default response for any other request (Not Found)
app.use((req,res) => {
        res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
        if (err) throw err;
        console.log('Database connected.');
        app.listen(PORT, () => {
                console.log(`Server running on PORT ${PORT}`);
        });
});


