const { Router } = require('express');
const router = Router();

const videogamesRouter = require('./videogames')
const genresRouter = require('./genres')

router.use('/videogames', videogamesRouter)

router.use('/genres', genresRouter)

module.exports = router;