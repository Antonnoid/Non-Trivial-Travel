const router = require('express').Router();

const authApiRouter = require('./api/auth.api.routes');
const placesApiRouter = require('./api/places.api.routes');
const mapApiRouter = require('./api/2gis.api.routes');
const cityApiRoutes = require('./api/cities.api.routes');

router.use('/api/auth', authApiRouter);
router.use('/api/places', placesApiRouter);
router.use('/api/2gis', mapApiRouter);
router.use('/api/cities', cityApiRoutes);

module.exports = router;
