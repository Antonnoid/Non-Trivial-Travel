const router = require('express').Router();
const { Route } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const routes = await Route.findAll({});
    res.json(routes);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
