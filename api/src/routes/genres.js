const { Router } = require('express');
const router = Router();
const {getGenres} = require('../controllers/getGenres')

router.get('/', getGenres )

module.exports = router;