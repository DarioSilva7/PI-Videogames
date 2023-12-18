const { Router } = require("express");
const router = Router();
const {
  createVideogameValidation,
  alreadyExistsByName,
  idVideogameByParamValidation,
} = require("../validations/videogames.validation");
const {
  getAllGames,
  getGameDetail,
  createGame,
} = require("../controllers/videogame.controller");

router.get("/", getAllGames);

router.get("/videogame/:id", idVideogameByParamValidation, getGameDetail);

router.post(
  "/create",
  alreadyExistsByName,
  createVideogameValidation,
  createGame
);

module.exports = router;
