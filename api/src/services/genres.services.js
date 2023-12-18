const { Genre } = require("../db");

const getGenresServices = async () => {
  const allGenres = await Genre.findAndCountAll();
  return {
    msg: `Generos encontrados: ${allGenres.count}`,
    data: allGenres.rows,
  };
};

module.exports = { getGenresServices };
