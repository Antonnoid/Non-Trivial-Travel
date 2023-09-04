const router = require('express').Router();
const { Bundle } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const bundles = await Bundle.findAll({});
    res.json(bundles);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
