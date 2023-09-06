const router = require('express').Router();
const {Route, Route_comment, Route_place, Place} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const routes = await Route.findAll({
      include: [
        {
          model: Route_place,
          include: {
            model: Place, // Включаем модель Place
          },
        },
        {
          model: Route_comment,
        },
      ],
    });
    res.json(routes);
  } catch ({message}) {
    res.json({message});
  }
});

router.post('/:routeId/rating', async (req, res) => {
  try {
    const {routeId} = req.params;
    const rating = await Rating.create({
      rate,
      type,
      userId: req.session.userId,
      itemId: +routeId,
    });
    res.json(rating);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
