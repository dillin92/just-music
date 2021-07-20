const express = require('express');
const router = express.Router();

router.use(require('./usersRoutes'));

module.exports = router;