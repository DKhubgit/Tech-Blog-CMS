const router = require('express').Router();
const routes = require('../controller/routes');

router.use('/', routes);

module.exports = router;