const { getPlatformsServices } = require("../services/platform.services");

exports.getPlatforms = async (req, res, next) => {
  try {
    const response = await getPlatformsServices();
    res.json({
      message: response.msg,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
