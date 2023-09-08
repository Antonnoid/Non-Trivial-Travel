const router = require('express').Router();

// Проксирование запроса через сервер
router.post('/', async (req, res) => {
  try {
    const {key} = req.query; // api-ключ

    const response = await fetch(
      `https://api.2gis.ru/routing/1.0.0/global?key=${key}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }
    );

    if (response.ok) {
      const routeData = await response.json();

      res.json(routeData);
    } else {
      console.error(
        'Ошибка при запросе маршрута',
        response.status,
        response.statusText
      );
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    console.error('Ошибка при обработке запроса', error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/', (req, res) => {
  res.end('ok');
});

module.exports = router;
