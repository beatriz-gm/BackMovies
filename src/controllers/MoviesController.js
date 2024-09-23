const knex = require("../database/knex");

class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags} = request.body;
    const user_id = request.user.id;

    const [movie_id] = await knex("movies").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const movie = await knex("movies").where({id}).first();
    const tags = await knex("tags").where({movie_id: id}).orderBy("name");

    return response.json({
      ...movie,
      tags,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movies").where({id}).delete();

    return response.json();
  }

  async index(request, response) {
    const {title} = request.query;
    const user_id = request.user.id;
    const movies = await knex("movies")
    .where({user_id})
    .whereLike("title", `%${title}%`)
    .orderBy("title");

    return response.json(movies);
  }
}

module.exports = MoviesController;