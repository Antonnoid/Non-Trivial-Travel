const router = require('express').Router();
const {Place_comment} = require('../../db/models');
const {Bundle_comment} = require('../../db/models');
const {Route_comment} = require('../../db/models');
const {User} = require('../../db/models');

// добавление
router.post('/place', async (req, res) => {
  try {
    const {text, placeId} = req.body;
    console.log(req.session.userId);
    if (req.session.userId) {
      const user = await User.findOne({where: {id: +req.session.userId}});
      const newComment = await Place_comment.create({
        text,
        placeId,
        userId: req.session.userId,
      });
      const comment = await Place_comment.findOne({
        where: {id: newComment.id},
        include: [User],
      });
      console.log(comment);
      res.json(comment);
      return;
    }
    res.json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});
router.post('/bundle', async (req, res) => {
  try {
    const {text, bundleId} = req.body;

    if (req.session.userId) {
      const comment = await Bundle_comment.create({
        text,
        bundleId,
        userId: req.session.userId,
      });
      res.json(comment);
      return;
    }
    res.json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});
router.post('/route', async (req, res) => {
  try {
    const {text, routeId} = req.body;

    if (req.session.userId) {
      const comment = await Route_comment.create({
        text,
        routeId,
        userId: req.session.userId,
      });
      res.json(comment);
      return;
    }
    res.json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});

module.exports = router;
