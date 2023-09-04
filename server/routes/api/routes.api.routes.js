const router = require('express').Router();
const {Route} = require('../../db/models');
const {Route_comment} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const routes = await Route.findAll({include: [Route_comment]});
    res.json(routes);
  } catch ({message}) {
    res.json({message});
  }
});

module.exports = router;
