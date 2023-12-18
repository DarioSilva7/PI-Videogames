const videoGameService = require("../services/videogame.services");

const createGame = async (req, res, next) => {
  try {
    const {
      img,
      name,
      description,
      released_date,
      genres,
      rating,
      platforms,
      createdInDB,
    } = req.body;
    const response = await videoGameService.createGameService(
      img,
      name,
      description,
      released_date,
      genres,
      rating,
      platforms,
      createdInDB
    );
    res
      .status(201)
      .json({ ok: true, message: response.msg, data: response.data });
  } catch (err) {
    console.log(
      "🚀 ~ file: createGame.js:35 ~ exports.createGame= ~ err:",
      err
    );
    next(err);
  }
};

const getGameDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await videoGameService.getGameDetailService(id);
    res.status(200).json({ message: response.msg, data: response.data });
  } catch (err) {
    next(err);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const { name } = req.query;
    // let { page, limit } = req.query;
    const { games, qty } = await videoGameService.getAllGamesService(
      name
      // page ? (!isNaN(parseInt(page)) ? parseInt(page) : 1) : 1,
      // limit ? (!isNaN(parseInt(limit)) ? parseInt(limit) : 15) : 15
    );
    res.status(200).json({
      message: "Videojuegos encontrados",
      data: games,
      qty,
      // page: response.page,
    });
  } catch (e) {
    console.log("🚀 ~ file: videogame.controller.js:53 ~ getAllGames ~ e:", e);
    next(e);
  }
};

module.exports = {
  createGame,
  getGameDetail,
  getAllGames,
};
