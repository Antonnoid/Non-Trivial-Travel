const router = require('express').Router();

const authApiRouter = require('./api/auth.api.routes');
const placesApiRouter = require('./api/places.api.routes');
const mapApiRouter = require('./api/2gis.api.routes');
const cityApiRoutes = require('./api/cities.api.routes');
const routesApiRouter = require('./api/routes.api.routes');
const bundlesApiRouter = require('./api/bundles.api.routes');
const imageApiRouter = require('./api/images.api.routes');

router.use('/api/auth', authApiRouter);
router.use('/api/places', placesApiRouter);
router.use('/api/2gis', mapApiRouter);
router.use('/api/cities', cityApiRoutes);
router.use('/api/routes', routesApiRouter);
router.use('/api/bundles', bundlesApiRouter);
router.use('/api/images', imageApiRouter);

module.exports = router;
