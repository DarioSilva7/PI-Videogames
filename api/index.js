//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn, Videogame, Genre, Platform } = require("./src/db.js");
const axios = require("axios");
const {
  getApiGames,
  createGameService,
} = require("./src/services/videogame.services.js");
const { API_KEY } = process.env;

// Syncing all the models at once
conn.sync({ alter: true }).then(async () => {
  const [genreCount, platformCount, videogameCount] = await Promise.all([
    Genre.count(),
    Platform.count(),
    Videogame.count(),
  ]);
  console.log("🚀 ~ file: index.js:31 ~ genreCount:", genreCount);
  console.log("🚀 ~ file: index.js:32 ~ platformCount:", platformCount);
  console.log("🚀 ~ file: index.js:33 ~ videogameCount:", videogameCount);

  genreCount == 0 &&
    axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`).then((rta) => {
      return rta.data.results.forEach((el) =>
        Genre.findOrCreate({
          where: {
            id: el.id,
            name: el.name,
          },
        })
      );
    });

  platformCount == 0 &&
    axios
      .get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
      .then((rta) => {
        return rta.data.results.forEach((el) =>
          Platform.findOrCreate({
            where: {
              id: el.id,
              name: el.name,
            },
          })
        );
      });

  if (videogameCount < 20) {
    const gamesData = await getApiGames();
    const promisesArray = gamesData.map((game) => {
      const {
        api_id,
        img,
        name,
        released_date,
        genres,
        rating,
        platforms,
        createdInDB,
      } = game;
      createGameService(
        img,
        name,
        null, //description
        released_date,
        genres.map((g) => g.id),
        rating,
        platforms.map((p) => p.id),
        createdInDB,
        api_id
      );
    });

    const [vgQty] = await Promise.all(
      [Videogame.count()].concat(promisesArray)
    );
    console.log("🚀 ~ file: index.js:89 ~ conn.sync ~ vgQty:", vgQty);
  }

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
