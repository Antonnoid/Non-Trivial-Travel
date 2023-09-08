const router = require('express').Router();
const {Place} = require('../../db/models');
const {Image} = require('../../db/models');
const {Place_comment} = require('../../db/models');
const {City} = require('../../db/models');
const {User} = require('../../db/models');
const {Op} = require('sequelize');
const {Rating} = require('../../db/models');
// const upLoader = reuire('../../midleware/uploader');

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
    const {images} = req.files;
    // const url = await upLoader(images);
    // console.log(req.files, '----------------');

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

        for (let key in req.files) {
          await Image.create({
            url: `/images/${req.files[key].name}`,
            placeId: newPlace.id,
          });
          req.files[key].mv(
            `${__dirname}/../../public/images/${req.files[key].name}`,
            (err) => {
              if (err) return res.status(500).send(err);
            }
          );
        }

        const place = await Place.findOne({
          where: {id: newPlace.id},
          include: [{model: Image}],
        });

        res.json(place);
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

router.post('/:placeId/rating', async (req, res) => {
  try {
    const {placeId} = req.params;
    const rating = await Rating.create({
      rate: req.body.rate,
      type: req.body.type,
      userId: req.session.userId,
      itemId: +placeId,
    });
    res.json(rating);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
