const router = require('express').Router();

const authApiRouter = require('./api/auth.api.routes');

router.use('/api/auth', authApiRouter);

module.exports = router;
