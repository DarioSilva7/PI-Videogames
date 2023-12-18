const { ValidationError } = require("sequelize");

function errorHandle(error, req, res, next) {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      ok: false,
      message: "Algo salio mal",
      data: {},
      error: error.errors.map((e) => {
        return { error: e.value, message: e.message };
      }),
    });
  } else {
    console.log("🚀 ~ file: error.handle.js:36 ~ errorHandle ~ error:", error);
    return res.status(500).json({
      ok: false,
      message: "Algo salio mal",
      data: {},
      error: [{ error: "Ocurrio un error", message: error.message }],
    });
  }
}

module.exports = { errorHandle };
