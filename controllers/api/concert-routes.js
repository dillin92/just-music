const router = require('express').Router();
const { User, Concert } = require('../../models');

//Get all concerts
router.get('/', (req, res) => {
    Concert.findAll({
        attributes: ['id', 'concert_name', 'concert_date', 'concert_details'],
        include: [
            {
                model: User, 
                attibutes: ['id']
            }
        ]
    })
        .then(dbConcertData => res.json(dbConcertData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//Get one concert from one user
router.get('/:id', (req, res) => {
    Concert.findOne({
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
    .then(dbConcertData => {
        if (!dbConcertData) {
            res.status(404).json({ message: 'No concert found with this id' });
            return;
        }
        res.json(dbConcertData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add concert 
router.post('/', (req, res) => {
    Concert.create({
        concert_name: req.body.concert_name,
        concert_date: req.body.concert_date,
        concert_details: req.body.concert_details,
        user_id: req.body.user_id
    })
        .then(dbConcertData=> res.json(dbConcertData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update artist info
router.put('/:id', (req, res) => {
    Concert.update(
        {
            concert_name: req.body.concert_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbConcertData => {
            if (!dbConcertData) {
                res.status(404).json({ message: 'No concert found with this id' });
                return;
            }
            res.json(dbConcertData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete an artist from the list
router.delete('/:id', (req, res) => {
    Concert.destroy({
        where: {
            id: req.params.id
        } 
    })
        .then(dbConcertData => {
            if (!dbConcertData) {
                res.status(404).json({ message: 'No concert found with this id' });
                return;
            }
            res.json(dbConcertData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); 

module.exports = router;