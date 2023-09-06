const router = require('express').Router();
const {Place} = require('../../db/models');
const {Image} = require('../../db/models');
const {Place_comment} = require('../../db/models');
const {City} = require('../../db/models');
const {User} = require('../../db/models');
const {Op} = require('sequelize');

router.get('/', async (req, res) => {
  try {
    const places = await Place.findAll({
      include: [
        {
          model: Image, // Включаем модель Image, связанную с Place
        },
        {
          model: Place_comment,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
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
      include: [
        {
          model: Image, // Включаем модель Image, связанную с Place
        },
        {
          model: Place_comment,
          include: [
            {
              model: User,
              include: [
                {
                  model: City,
                },
              ],
            },
          ],
        },
      ],
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
          userId: +req.session.userId,
          cityId: cityByName.id,
          latitude: 45.4535,
          longitude: 35.32435,
        });
        res.json(newPlace);
        return;
      }
    }
    res.status(200).json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});
router.delete('/:placeId', async (req, res) => {
  try {
    const {placeId} = req.params;
    let admin = null;
    if (req.session.userId) {
      admin = await User.findOne({
        where: {id: req.session.userId, isAdmin: true},
      });
    }

    const place = await Place.findOne({where: +placeId});

    if (placeId && (admin || place.userId === +req.session.userId)) {
      await Place.destroy({where: {id: +placeId}});

      res.status(200).json(placeId);
      return;
    }
    res.status(403).json({message: 'Ошибка доступа'});
  } catch ({message}) {
    console.log(message);
  }
});

router.put('/:placeId', async (req, res) => {
  try {
    const {placeId} = req.params;
    const {isPublic} = req.body;
    const place = await Place.findOne({where: {id: placeId}});
    place.isPublic = isPublic;
    await place.save();
    res.json(place);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
