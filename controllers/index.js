const router = require('express').Router();

//requiring the api and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//use / for homeRoutes and /api for apiRoutes files
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;