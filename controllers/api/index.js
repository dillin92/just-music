const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');
const concertRoutes = require('./concert-routes');
const topArtistsRoutes = require('./top-artist-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/concerts', concertRoutes);
router.use('/top-artists', topArtistsRoutes);

module.exports = router;