const { Router } = require("express");

const usersRouter = require("./usersRoutes");
const moviesRouter = require("./moviesRoutes");
const sessionsRouter = require("./sessionsRoutes");
const tagsRouter = require("./tagsRoutes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/movies", moviesRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;