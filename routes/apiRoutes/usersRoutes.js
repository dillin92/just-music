const express = require('express');
const router = express.Router();
const db = require('../../config/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all users
router.get('/account_info', (req, res) => {
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
router.get('/account_info/:id', (req, res) => {
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
router.delete('/account_info/:id', (req, res) => {
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
router.post('/account_info', ({ body }, res) => {
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
            VALUES (?,?,?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.user_type, body.user_name, body.account_password, body.email_address];

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

module.exports = router;