const router = require('express').Router();
const {Place} = require('../../db/models');
const {Image} = require('../../db/models');

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

module.exports = router;
