const router = require('express').Router();
const {Rating} = require('../../db/models')

router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
