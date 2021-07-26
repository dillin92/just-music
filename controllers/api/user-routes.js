const router = require('express').Router();
const { User, Post } = require('../../models');

// Get all users
router.get('/', (req, res) => {
        // Access our User model and run .findAll() method)
        User.findAll({
                attributes: {exclude: ['password'] }
        })
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                        res.status(500).json(err);
                });
});

// Get a single user
router.get('/:id', (req, res) => {
        User.findOne({
                attributes: { exclude: ['password'] },
                where: {
                        id: req.params.id
                },
                include: [
                        {
                                model: Post,
                                attributes: ['id', 'title', 'post_body', 'created_at']
                        },
                        {
                                model: Comment,
                                attributes: ['id', 'comment_text', 'created_at'],
                                include: {
                                        model: Post,
                                        attributes: ['title']
                                }
                        }        
                ]
        })
                .then(dbUserData => {
                        if (!dbUserData) {
                                res.status(404).json({ message: 'No user found with this id' });
                                return;
                        }
                        res.json(dbUserData);
                })
                .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                });
});

// Create a user
router.post('/', (req, res) => {
        User.create({ 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                user_type: req.body.user_type,
                email_address: req.body.email_address,
                password: req.body.password
        })
                .then(dbUserData => {
                        req.session.save(() => {
                                req.session.user_id = dbUserData.id;
                                req.session.email_address = dbUserData.email_address;
                                req.session.loggedIn = true;

                                res.json(dbUserData);
                        });
                })
                .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                });
});

// Login Route
router.post('/login', (req, res) => {
        User.findOne({
                where: {
                        email_address: req.body.email_address
                }
        }).then(dbUserData => {
                if (!dbUserData) {
                        res.status(400).json({ message: 'No user with that email address!' });
                        return;
                }

                const validPassword = dbUserData.checkPassword(req.body.password);

                if (!validPassword) {
                        res.status(400).json({ message: 'Incorrect password!' });
                        return;
                }
                
                req.session.save(() => {
                        req.session.user_id = dbUserData.id;
                        req.session.email_address = dbUserData.email_address;
                        req.session.loggedIn = true;

                        res.json({ user: dbUserData, message: 'You are now logged in!'});
                });
        });
});

// Logout Route
router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
                req.session.destroy(() => {
                        res.status(204).end();
                });
        }
        else {
                res.status(404).end();
        }
});

// Update User info
router.put('/:id', (req,res) => {
        User.update(req.body, {
                inidividualHooks: true,
                where: {
                        id: req.params.id
                }
        })
                .then(dbUserData => {
                        if (!dbUserData[0]) {
                                res.status(404).json({ message: 'No user found with this id' });
                                return;
                        }
                        res.json(dbUserData);
                })
                .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                });
});


// Delete a user
router.delete('/:id', (req, res) => {
        User.destroy({
                where: {
                        id: req.params.id
                }
        })
                .then(dbUserData => {
                        if (!dbUserData) {
                                res.status(404).json({ message: 'No user found with this id' });
                                return;
                        }
                        res.json(dbUserData);
                })
                .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                });
});

module.exports = router;