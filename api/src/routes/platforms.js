const { Router } = require("express");
const router = Router();
const { getPlatforms } = require("../controllers/platform.controller");

router.get("/", getPlatforms);

module.exports = router;
