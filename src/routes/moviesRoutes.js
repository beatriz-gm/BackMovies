const { Router } = require("express");
const moviesRoutes = Router();

const MoviesController = require("../controllers/MoviesController");
const moviesController = new MoviesController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
moviesRoutes.use(ensureAuthenticated);

moviesRoutes.post("/", moviesController.create);
moviesRoutes.get("/", moviesController.index)
moviesRoutes.get("/:id", moviesController.show);
moviesRoutes.delete("/:id", moviesController.delete);

module.exports = moviesRoutes;