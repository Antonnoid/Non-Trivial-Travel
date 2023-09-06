const router = require('express').Router();
const Sequelize = require('sequelize');
const {Op} = require('sequelize');
const {City, Place, Bundle, Route} = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const cities = await City.findAll({});
    res.json(cities);
  } catch ({message}) {
    res.json(message);
  }
});

// запрос на вывод count городов
router.get('/first/:count', async (req, res) => {
  try {
    const {count} = req.params;
    const cities = await City.findAll({limit: count});
    res.json(cities);
  } catch ({message}) {
    res.json(message);
  }
});

// популярные города
router.get('/popular', async (req, res) => {
  try {
    const {count} = req.params;
    const popularCity = [1, 172, 2279, 409, 2033];
    const cities = await City.findAll({
      where: {
        id: {
          [Op.in]: popularCity,
        },
      },
    });
    res.json(cities);
  } catch ({message}) {
    res.json(message);
  }
});

// запрос по id
router.get('/search/id/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const city = await City.findOne({
      where: {id},
      include: [Place, Bundle, Route],
    });
    console.log(city);
    res.json(city);
  } catch ({message}) {
    res.json(message);
  }
});

// запрос по первым буквам имени
router.post('/search/name', async (req, res) => {
  try {
    const {name} = req.body;
    console.log(req.body);
    const city = await City.findAll({
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('name')), // нечувствителен к регистру
        'LIKE',
        `${name}%`
      ),
      include: [
        {
          model: Place,
        },
      ],
    });
    if (city) {
      res.json(city);
      return;
    }

    res.json({message: 'Такого города нет'});
  } catch ({message}) {
    res.json(message);
  }
});
module.exports = router;
