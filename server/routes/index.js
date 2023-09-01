const router = require('express').Router();

const authApiRouter = require('./api/auth.api.routes');
const placesApiRouter = require('./api/places.api.routes');

router.use('/api/auth', authApiRouter);
router.use('/api/places', placesApiRouter);

module.exports = router;
