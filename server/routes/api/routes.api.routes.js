const router = require('express').Router();
const {Route} = require('../../db/models');
const {Route_comment, Place, Route_place} = require('../../db/models');

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

module.exports = router;
