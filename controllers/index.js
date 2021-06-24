const router = require('express').Router();

//requiring the api and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashRoutes = requir('./dashboardRoutes')

//use / for homeRoutes and /api for apiRoutes files
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes)

module.exports = router;