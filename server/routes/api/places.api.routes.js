const router = require('express').Router();
const {Place} = require('../../db/models');
const {Image} = require('../../db/models');
const {City} = require('../../db/models');
const {User} = require('../../db/models');
const {Op} = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const places = await Place.findAll({
      include: {model: Image},
    });
    res.json(places);
  } catch ({message}) {
    res.json({message});
  }
});

router.get('/:placeId', async (req, res) => {
  try {
    const place = await Place.findOne({
      where: {id: req.params.placeId},
      include: {model: Image},
    });
    res.json(place);
  } catch ({message}) {
    res.json({message});
  }
});
router.post('/', async (req, res) => {
  try {
    const {title, description, city} = req.body;
    if (req.session.userId) {
      const cityByName = await City.findOne({
        where: {
          name: {
            [Op.iLike]: city, // Игнорировать регистр
          },
        },
      });
      if (cityByName) {
        const newPlace = await Place.create({
          title,
          description,
          userId: req.session.userId,
          cityId: cityByName.id,
          latitude: 45.4535,
          longitude: 35.32435,
        });
        res.json(newPlace);
        return;
      }
    }
    res.json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});
router.delete('/:placeId', async (req, res) => {
  const {placeId} = req.params;
  const admin = await User.findOne({
    where: {id: req.session.userId, isAdmin: true},
  });

  const place = await Place.findOne({where: +placeId});
  if (placeId && (admin || place.userId === +req.session.userId)) {
    await Place.destroy({where: {id: +placeId}});

    res.json(placeId);
    return;
  }
  res.json({message: 'Ошибка доступа'});
});
module.exports = router;
