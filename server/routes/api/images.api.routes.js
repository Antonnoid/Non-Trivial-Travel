const router = require('express').Router();
const {Image} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.json(images);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
