const express = require('express');
const mysql = require('mysql2');
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

// Connect to database
const db = mysql.createConnection(
        {
                host: 'localhost',
                user: 'root',
                password: 'Buddydog2015!',
                database: 'users'
        },
        console.log('Connected to the users database.')
);

// Get all users
app.get('/api/account_info', (req, res) => {
        const sql = `SELECT * FROM account_info`;

        db.query(sql, (err, rows) => {
                if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                }
                res.json({
                        message: 'success',
                        data: rows
                });
        });
});

// Get a single user
app.get('/api/account_info/:id', (req, res) => {
        const sql = `SELECT * FROM account_info WHERE id = ?`;
        const params = [req.params.id];
        
        db.query(sql, params, (err, row) => {
                if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                }
                res.json({
                        message: 'success',
                        data: row
                });
        });
});

// Delete a user
app.delete('/api/account_info/:id', (req, res) => {
        const sql = `DELETE FROM account_info WHERE id = ?`;
        const params = [req.params.id];

        db.query(sql, params, (err, result) => {
                if (err) {
                        res.statusMessage(400).json({ error: res.message });
                } else if (!result.affectedRows) {
                        res.json({
                                message: 'User not found'
                        });
                } else {
                        res.json({
                                message: 'deleted',
                                changes: result.affectedRows,
                                id: req.params.id
                        });
                }
        });
});


// Create a user
app.post('/api/account_info', ({ body }, res) => {
        const errors = inputCheck(
                body,
                'first_name',
                'last_name',
                'user_type',
                'user_name',
                'account_password',
                'email_address'
        );
        if (errors) {
                res.status(400).json({ error: errors });
                return;
        }

        const sql = `INSERT INTO account_info (first_name, last_name, user_type, user_name, account_password, email_address)
                VALUES (?,?,?,?,?,?,?)`;
        const params = [body.fist_name, body.last_name, body.user_type, body.user_name, body.account_password, body.email_address];

        db.query(sql, params, (err, result) => {
                if (err) {
                        res.status(400).json({ error: err.message });
                        return;
                }
                res.json({
                        message: 'success',
                        data: body
                });
        });     
});

// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT);
});
