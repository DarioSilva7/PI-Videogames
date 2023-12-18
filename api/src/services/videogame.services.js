require("dotenv").config();
const { validate } = require("uuid");
const axios = require("axios");
const { Videogame, Genre, Platform, Op } = require("../db");
const { Sequelize } = require("sequelize");
const { API_KEY } = process.env;

const createGameService = async (
  img,
  name,
  description,
  released_date,
  genres,
  rating,
  platforms,
  createdInDB,
  api_id = null
) => {
  const createdVideoGame = await Videogame.create({
    api_id,
    img,
    name,
    description,
    released_date,
    genres,
    rating,
    platforms,
    createdInDB,
  });

  const genresPromises = genres.flat().map((g) => Genre.findByPk(g));
  const platformsPromises = platforms.flat().map((p) => Platform.findByPk(p));

  // const allPromises = genresPromises.concat(platformsPromises);
  const genresToAdd = await Promise.all(genresPromises);
  const platformsToAdd = await Promise.all(platformsPromises);

  await Promise.all([
    createdVideoGame.addGenres(genresToAdd),
    createdVideoGame.addPlatforms(platformsToAdd),
  ]);
  return {
    msg: "Successfully created videogame.",
    data: createdVideoGame,
  };
};

const getGameDetailService = async (id) => {
  let game = null;
  if (validate(id)) {
    game = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
        {
          model: Platform,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    if (game && !game.description) {
      const { data } = await axios.get(
        `https://api.rawg.io/api/games/${game.api_id}?key=${API_KEY}`
      );
      await game.update({ description: data.description });
    }
  } else {
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );

    game = {
      id: data.id,
      name: data.name,
      img: data.background_image,
      genres: data.genres.map((g) => {
        return { id: g.id, name: g.name };
      }),
      description: data.description,
      released: data.released,
      rating: data.rating_top,
      platforms: data.parent_platforms.map((c) => {
        return { id: c.platform.id, name: c.platform.name };
      }),
    };
  }

  return game
    ? { msg: "Videojuego encontrado", data: game }
    : { msg: "No se encuentra videojuego", data: null };
};

const getAllGamesService = async (name, page, limit) => {
  // const gamesPerPage = 15;
  // const startIndex = (page - 1) * gamesPerPage;
  // const endIndex = startIndex + gamesPerPage;
  // let gamesOnPage;
  // if (name) {
  //   const [allgames, ofDB] = await Promise.all([
  //     axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`),
  //     Videogame.findAll({
  //       where: {
  //         name: { [Op.like]: `%${name}%` },
  //       },
  //       include: {
  //         model: Genre,
  //         attributes: ["name"],
  //         through: {
  //           attributes: [],
  //         },
  //       },
  //     }),
  //   ]);

  //   let arr = mapGames(allgames.data.results);
  //   gamesOnPage = ofDB.concat(arr).slice(startIndex, endIndex);
  // } else {
  //   const [fromApi, fromDB] = await Promise.all([getApiGames(), getDBgame()]);
  //   const allgames = fromDB.concat(fromApi);
  //   gamesOnPage = allgames.slice(startIndex, endIndex);
  // }
  const whereCondition = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
  const gamesData = await Videogame.findAll({
    where: whereCondition,
    // limit,
    order: [["createdInDB", "DESC"]],
    // offset: (page - 1) * limit,
    include: [
      {
        model: Genre,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return {
    msg: "Videojuegos encontrados",
    games: gamesData,
    qty: gamesData.length,
    // page,
  };
};

// const getDBgame = async () => {
//   return await Videogame.findAll({
//     include: [
//       {
//         model: Genre,
//         attributes: ["id", "name"],
//         through: {
//           attributes: [],
//         },
//       },
//       {
//         model: Platform,
//         attributes: ["id", "name"],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   });
// };

const getApiGames = async () => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const gamespromisesArray = pages.map((page) =>
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`)
  );

  const gamesArray = await Promise.all(gamespromisesArray);
  let gamesData = [];
  for (let i = 0; i < gamesArray.length; i++) {
    gamesData = [...gamesData, ...mapGames(gamesArray[i].data.results)];
  }
  return gamesData;
};

const mapGames = (arreglo) => {
  const aux = arreglo.map((c) => {
    return {
      api_id: c.id,
      name: c.name,
      img: c.background_image,
      released_date: c.released,
      genres: c.genres
        ? c.genres.map((g) => {
            return { id: g.id, name: g.name };
          })
        : [{ id: 34, name: "Educational" }],
      rating: c.rating_top,
      platforms: c.platforms
        ? c.platforms.map((p) => {
            return { id: p.platform.id, name: p.platform.name };
          })
        : [{ id: 4, name: "PC" }],
      createdInDB: false,
    };
  });
  return aux;
};

module.exports = {
  createGameService,
  getGameDetailService,
  getAllGamesService,
  getApiGames,
};
