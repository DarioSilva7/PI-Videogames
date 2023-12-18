const { getGenresServices } = require("../services/genres.services");

exports.getGenres = async (req, res, next) => {
  try {
    const response = await getGenresServices();
    res.json({
      message: response.msg,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
