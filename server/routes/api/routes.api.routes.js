const router = require('express').Router();
const {
  Rating,
  Route,
  Route_comment,
  Route_place,
  Place,
  User,
} = require('../../db/models');

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

// удаление
router.delete('/:routeId', async (req, res) => {
  try {
    const {routeId} = req.params;
    const user = await User.findOne({
      where: {id: req.session.userId},
    });
    const route = await Route.findOne({where: {id: +routeId}});
    if (user.isAdmin || route.userId === user.id) {
      await Route.destroy({where: {id: routeId}});
      res.json(routeId);
      return;
    }
    res.status(403).json({message: 'Ошибка доступа'});
  } catch ({message}) {
    console.log(message);
  }
});

module.exports = router;
