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

router.post('/', async (req, res) => {
  try {
    const {title, description, isPublic, time, userId, cityId, routePlaces} =
      req.body;
      console.log(title, description, isPublic, userId, time, cityId, routePlaces);
    const newRoute = await Route.create({
      title,
      description,
      isPublic,
      time,
      userId: +userId,
      cityId: +cityId,
    });
   routePlaces.map(async (placeId, i) => {
       await Route_place.create({routeId: newRoute.id, placeId, order: i + 1})
    });
 
    res.json(newRoute);
  } catch ({message}) {
    console.log({message})
    res.json({message})

  }
});

module.exports = router;
