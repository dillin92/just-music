const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboaredRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboaredRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;