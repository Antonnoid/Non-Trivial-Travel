const router = require('express').Router();
const {Bundle} = require('../../db/models');
const {Bundle_place} = require('../../db/models');
const {Place} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const bundles = await Bundle.findAll({include: {model: Bundle_place, include: {model: Place}}});
    console.log(bundles);
    res.json(bundles);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
