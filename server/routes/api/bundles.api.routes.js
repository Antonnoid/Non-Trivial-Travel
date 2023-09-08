const router = require('express').Router();
const {Bundle} = require('../../db/models');
const {Bundle_place, Place, User} = require('../../db/models');
const {Bundle_comment} = require('../../db/models');
const {Rating} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const bundles = await Bundle.findAll({
      include: [
        {
          model: Bundle_place,
          include: {
            model: Place, // Включаем модель Place
          },
        },
        {
          model: Bundle_comment,
        },
      ],
    });
    res.json(bundles);
  } catch ({message}) {
    res.json({message});
  }
});

router.post('/', async (req, res) => {
  try {
    const {title, description, isPublic, userId, cityId, bundlePlaces} =
      req.body;
    const newBundle = await Bundle.create({
      title,
      description,
      isPublic,
      userId,
      cityId,
    });
    bundlePlaces.map(async (placeId) => {
      await Bundle_place.create({bundleId: newBundle.id, placeId});
    });

    res.json(newBundle);
  } catch ({message}) {
    console.log({message});
    res.json({message});
  }
});

router.post('/:bundleId/rating', async (req, res) => {
  try {
    const {bundleId} = req.params;
    const rating = await Rating.create({
      rate: req.body.rate,
      type: req.body.type,
      userId: req.session.userId,
      itemId: +bundleId,
    });
    res.json(rating);
  } catch ({message}) {
    res.json({message});
  }
});

// удаление

router.delete('/:bundleId', async (req, res) => {
  try {
    const {bundleId} = req.params;
    const user = await User.findOne({
      where: {id: req.session.userId},
    });
    const bundle = await Bundle.findOne({where: {id: +bundleId}});
    if (user.isAdmin || bundle.userId === user.id) {
      await Bundle.destroy({where: {id: bundleId}});
      res.json(bundleId);
      return;
    }
    res.status(403).json({message: 'Ошибка доступа'});
  } catch ({message}) {
    console.log(message);
  }
});

module.exports = router;
