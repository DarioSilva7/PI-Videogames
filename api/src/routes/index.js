const { Router } = require("express");
const router = Router();

const videogamesRouter = require("./videogames");
const genresRouter = require("./genres");
const paltformsRouter = require("./platforms");

router.use("/videogames", videogamesRouter);

router.use("/genres", genresRouter);

router.use("/platforms", paltformsRouter);

module.exports = router;
