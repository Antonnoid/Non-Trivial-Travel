const router = require('express').Router();
const {Bundle} = require('../../db/models');
const {Bundle_place, Place} = require('../../db/models'); // Импортируем Bundle_place и Place
const {Bundle_comment} = require('../../db/models');

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
       await Bundle_place.create({bundleId: newBundle.id, placeId})
    });
  console.log(newBundle);
    res.json(newBundle);
  } catch ({message}) {
    console.log({message})
    res.json({message})
  }
});

router.post('/:bundleId/rating', async (req, res) => {
  try {
    const {bundleId} = req.params;
    const rating = await Rating.create({
      rate,
      type,
      userId: req.session.userId,
      itemId: +bundleId,
    });
    res.json(rating);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
