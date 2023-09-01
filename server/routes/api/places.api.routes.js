const router = require('express').Router();
const { Place } = require ('../../db/models')
const {Image} = require('../../db/models')

router.get('/', async (req, res) => {
  try {
    const places = await Place.findAll({
      include: {model: Image}
    })
    res.json(places)
  } catch ({message}) {
    res.json({message})
  }
})