const router = require('express').Router();
const { Bundle } = require('../../db/models');
const { Bundle_place, Place } = require('../../db/models'); // Импортируем Bundle_place и Place
const { Bundle_comment } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const bundles = await Bundle.findAll({
      include: [
        {
          model: Bundle_place,
          include: {
            model: Place, // Включаем модель Place
          },
        },
        {
          model: Bundle_comment,
        },
      ],
    });
    res.json(bundles);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;