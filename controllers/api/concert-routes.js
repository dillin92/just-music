const router = require('express').Router();
const { User, Concerts } = require('../../models');
const withAuth = require('../../utils/auth');

//Get all concerts
router.get('/', (req, res) => {
    Concerts.findAll({
        attributes: ['id', 'concert_name', 'concert_date', 'concert_details'],
        include: [
            {
                model: User, 
                attibutes: ['id']
            }
        ]
    })
        .then(dbConcertsData => res.json(dbConcertsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//Get one concert from one user
router.get('/:id', (req, res) => {
    Concerts.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'concert_name', 'concert_date', 'concert_details'],
        include: [
            {
                model: User, 
                attibutes: ['id']
            }
        ]
    })
    .then(dbConcertsData => {
        if (!dbConcertsData) {
            res.status(404).json({ message: 'No concert found with this id' });
            return;
        }
        res.json(dbConcertsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add concert 
router.post('/', withAuth, (req, res) => {
    Concerts.create({
        concert_name: req.body.concert_name,
        concert_date: req.body.concert_date,
        concert_details: req.body.concert_details,
        user_id: req.body.user_id
    })
        .then(dbConcertsData=> res.json(dbConcertsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update artist info
router.put('/:id', withAuth, (req, res) => {
    Concerts.update(
        {
            concert_name: req.body.concert_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbConcertsData => {
            if (!dbConcertsData) {
                res.status(404).json({ message: 'No concert found with this id' });
                return;
            }
            res.json(dbConcertsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete an artist from the list
router.delete('/:id', withAuth, (req, res) => {
    Concerts.destroy({
        where: {
            id: req.params.id
        } 
    })
        .then(dbConcertsData => {
            if (!dbConcertsData) {
                res.status(404).json({ message: 'No concert found with this id' });
                return;
            }
            res.json(dbConcertsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); 

module.exports = router;