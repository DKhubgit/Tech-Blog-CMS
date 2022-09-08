const router = require('express').Router();
const routes = require('../controller/routes');
const dashRoutes = require('../controller/dashboard-routes')
const loginRoutes = require('../controller/login-routes')
const signupRoutes = require('../controller/signup-routes')

router.use('/', routes);
router.use('/dashboard', dashRoutes)
router.use('/login', loginRoutes)
router.use('/signup', signupRoutes)

module.exports = router;