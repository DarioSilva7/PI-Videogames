const { Router } = require('express');
const router = Router();
const { getGames } = require('../controllers/getGames')
const { getDetail } = require('../controllers/getDetail')
const { createGame } = require('../controllers/createGame')

router.get('/', getGames )

router.get('/videogame/:id', getDetail)

router.post('/create', createGame )

module.exports = router;