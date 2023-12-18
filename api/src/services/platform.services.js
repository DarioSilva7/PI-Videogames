const { Platform } = require("../db");

const getPlatformsServices = async () => {
  const allPlatforms = await Platform.findAndCountAll();
  return {
    msg: `Plataformas encontradas: ${allPlatforms.count}`,
    data: allPlatforms.rows,
  };
};

module.exports = { getPlatformsServices };
