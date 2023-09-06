const router = require('express').Router();
const {Place_comment} = require('../../db/models');
const {Bundle_comment} = require('../../db/models');
const {Route_comment} = require('../../db/models');
const {User} = require('../../db/models');
const {City} = require('../../db/models');

// добавление
router.post('/place', async (req, res) => {
  // места
  try {
    const {text, placeId} = req.body;
    console.log(req.body);
    if (req.session.userId && text.trim()) {
      const newComment = await Place_comment.create({
        text,
        placeId,
        userId: req.session.userId,
      });
      const comment = await Place_comment.findOne({
        where: {id: newComment.id},
        include: [{model: User, include: [{model: City}]}],
      });

      res.json(comment);
      return;
    }
    res.json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});
router.post('/bundle', async (req, res) => {
  // подборки
  try {
    const {text, bundleId} = req.body;

    if (req.session.userId) {
      const newComment = await Bundle_comment.create({
        text,
        bundleId,
        userId: req.session.userId,
      });
      const comment = await Bundle_comment.findOne({
        where: {id: newComment.id},
        include: [{model: User, include: [{model: City}]}],
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
      const newComment = await Route_comment.create({
        text,
        routeId,
        userId: req.session.userId,
      });
      const comment = await Route_comment.findOne({
        where: {id: newComment.id},
        include: [{model: User, include: [{model: City}]}],
      });
      res.json(comment);
      return;
    }
    res.json({message: 'Войдите или зарегистрируйтесь'});
  } catch ({message}) {
    console.log(message);
  }
});

//удаление

router.delete('/place/:commentId', async (req, res) => {
  // места
  try {
    const {commentId} = req.params;
    console.log(commentId);
    const comment = await Place_comment.findOne({
      where: {id: +commentId},
      include: [{model: User}],
    });

    if (
      req.session.userId &&
      (comment.User.isAdmin || comment.userId === +req.session.userId)
    ) {
      const data = await Place_comment.destroy({where: {id: commentId}});
      console.log(data);
      res.json(commentId);
      return;
    }
    res.json({message: 'Ошибка удаления'});
  } catch ({message}) {
    console.log(message);
  }
});
router.delete('/bundle/:commentId', async (req, res) => {
  // подборки
  try {
    const {commentId} = req.params;
    console.log(commentId);
    const comment = await Bundle_comment.findOne({
      where: {id: +commentId},
      include: [{model: User}],
    });

    if (
      req.session.userId &&
      (comment.User.isAdmin || comment.userId === +req.session.userId)
    ) {
      const data = await Bundle_comment.destroy({where: {id: commentId}});
      console.log(data);
      res.json(commentId);
      return;
    }
    res.json({message: 'Ошибка удаления'});
  } catch ({message}) {
    console.log(message);
  }
});

router.delete('/route/:commentId', async (req, res) => {
  //маршруты
  try {
    const {commentId} = req.params;
    console.log(commentId);
    const comment = await Route_comment.findOne({
      where: {id: +commentId},
      include: [{model: User}],
    });

    if (
      req.session.userId &&
      (comment.User.isAdmin || comment.userId === +req.session.userId)
    ) {
      const data = await Route_comment.destroy({where: {id: commentId}});
      console.log(data);
      res.json(commentId);
      return;
    }
    res.json({message: 'Ошибка удаления'});
  } catch ({message}) {
    console.log(message);
  }
});

module.exports = router;
