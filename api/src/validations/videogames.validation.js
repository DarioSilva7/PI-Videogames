const joi = require("joi");
const { validate } = require("uuid");
const { Videogame } = require("../db");
const { validationErrorResponse } = require("../utils/joi.validation.response");

const videogameAttributes = {
  createdInDB: joi.boolean(),
  name: joi
    .string()
    .min(5)
    .max(15)
    .pattern(new RegExp(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+$/))
    .label(
      "Nombre debe tener un minimo de 5 y un maximo de 15 caracteres, solo caracteres de a-z y 0-9"
    ),
  img: joi.string(),
  description: joi
    .string()
    .min(10)
    .max(1000)
    .pattern(new RegExp(/^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s,.:!#\$%&\/']+$/i))

    .label(
      "La descripcion debe tener un minimo de 10 y maximo de 1000 caracteres"
    ),
  released_date: joi.string().label("Fecha de lanzamiento es requerida"),
  rating: joi
    .number()
    .min(1)
    .max(5)
    .label("Rating es requerido y debe ser un valor entre 1 y 5"),
  platforms: joi.array().items(joi.number()),
  genres: joi.array().items(joi.number()),
  createdInDB: joi.bool(),
};

const blueprintCreateVideogame = joi.object().keys({
  name: videogameAttributes.name.required(),
  img: videogameAttributes.img,
  description: videogameAttributes.description.required(),
  released_date: videogameAttributes.released_date.required(),
  rating: videogameAttributes.rating.required(),
  platforms: videogameAttributes.platforms.required(),
  genres: videogameAttributes.genres.required(),
  createdInDB: videogameAttributes.createdInDB.required(),
});

const createVideogameValidation = async (req, res, next) => {
  const validationResult = blueprintCreateVideogame.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (validationResult.error) {
    return validationErrorResponse(res, validationResult.error);
  }
  next();
};

const alreadyExistsByName = async (req, res, next) => {
  const { name } = req.body;
  !name && next(new Error("Nombre es requerido"));
  const videogameFound = await Videogame.findOne({ where: { name } });
  if (videogameFound)
    next(new Error("No es posible crear un juego con ese nombre"));
  else next();
};

const idVideogameByParamValidation = async (req, res, next) => {
  const { id } = req.params;
  if (!id) next(new Error("El id del videojuego es requerido"));
  if (!validate(id) && isNaN(id) && typeof id !== "number")
    next(new Error("El id del videojuego es invalido"));
  else next();
};

module.exports = {
  createVideogameValidation,
  alreadyExistsByName,
  idVideogameByParamValidation,
};
