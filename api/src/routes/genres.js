const { Router } = require("express");
const { getGenres } = require("../controllers/genres.controller");
const router = Router();

router.get("/", getGenres);

module.exports = router;
