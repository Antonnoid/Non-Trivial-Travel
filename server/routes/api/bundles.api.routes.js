const router = require('express').Router();
const {Bundle} = require('../../db/models');
const {Bundle_comment} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const bundles = await Bundle.findAll({include: [Bundle_comment]});
    res.json(bundles);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
