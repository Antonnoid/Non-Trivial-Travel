const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, City} = require('../../db/models');

//регистрация
router.post('/registration', async (req, res) => {
  try {
    let user;
    const {name, email, password, cityName} = req.body;
    if (name && email && password) {
      const city = await City.findOne({where: {name: cityName}});
      console.log(city);

      user = await User.findOne({where: {email}});
      if (user) {
        res.status(400).json({message: 'Данная почта уже существует'});
        return;
      } else {
        const hash = await bcrypt.hash(req.body.password, 10);
        user = await User.create({
          name,
          email,
          password: hash,
          cityId: city.id,
          isAdmin: false,
        });
        req.session.userId = user.id;
        res.status(200).json(user);
        return;
      }
    } else {
      res.status(400).json({message: 'Заполните пожалуйста все поля!'});
      return;
    }
  } catch ({message}) {
    res.status(500).json(message);
  }
});

//авторизация
router.post('/authorization', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!email || !password) {
      res.status(400).json({message: 'Заполните все поля'});
      return;
    }
    if (!user) {
      res.status(400).json({message: 'Почта или пароль не совпадают'});
      return;
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!user || !compare) {
      res.status(400).json({message: 'Почта или пароль не совпадают'});
      return;
    }
    req.session.userId = user.id;
    res.status(200).json(user);
  } catch ({message}) {
    res.status(500).json({message});
  }
});

router.get('/check', async (req, res) => {
  try {
    const {userId} = req.session;
    if (userId) {
      const user = await User.findOne({
        where: {id: userId},
        attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
      });
      res.status(201).json(user);
      return;
    }
    res.json(null);
  } catch ({message}) {
    res.json({message});
  }
});

router.get('/logout', (req, res) => {
  // удаление сессии на сервере
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({message: 'Ошибка при удалении сессии'});
    }
    res.clearCookie('user_sid').json({message: 'success'}); // серверное удаление куки по имени
  });
});

module.exports = router;
