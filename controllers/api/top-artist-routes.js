const router = require('express').Router();
const { User, TopArtists} = require('../../models');
const withAuth = require('../../utils/auth');

//Get all artists
router.get('/', (req, res) => {
    TopArtists.findAll({
        attributes: ['id', 'artist_name', 'artist_image'],
        include: [
            {
                model: User, 
                attibutes: ['id']
            }
        ]
    })
        .then(dbTopArtistsData => res.json(dbTopArtistsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//Get one artist from one user
router.get('/:id', (req, res) => {
    TopArtists.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'artist_name', 'artist_image'],
        include: [
            {
                model: User, 
                attibutes: ['id']
            }
        ]
    })
    .then(dbTopArtistsData => {
        if (!dbTopArtistsData) {
            res.status(404).json({ message: 'No artist found with this id' });
            return;
        }
        res.json(dbTopArtistsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add artist to list
router.post('/', withAuth, (req, res) => {
    TopArtists.create({
        artist_name: req.body.artist_name,
        artist_image: req.body.artist_image,
        user_id: req.body.user_id
    })
        .then(dbTopArtistsData=> res.json(dbTopArtistsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update artist info
router.put('/:id', withAuth, (req, res) => {
    TopArtists.update(
        {
            artist_name: req.body.artist_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbTopArtistsData => {
            if (!dbTopArtistsData) {
                res.status(404).json({ message: 'No artist found with this id' });
                return;
            }
            res.json(dbTopArtistsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete an artist from the list
router.delete('/:id', withAuth, (req, res) => {
    TopArtists.destroy({
        where: {
            id: req.params.id
        } 
    })
        .then(dbTopArtistsData => {
            if (!dbTopArtistsData) {
                res.status(404).json({ message: 'No artist found with this id' });
                return;
            }
            res.json(dbTopArtistsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}); 

module.exports = router;