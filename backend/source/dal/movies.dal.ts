import { Request } from 'express';
import knex from '../config/config';

const getAllMovies = async (req: Request) => {
    const getMovies = await knex('movies')
        .select('*', knex.raw('CONCAT("[",GROUP_CONCAT(DISTINCT (genres.genre)),"]") as genre'))
        .join('movies_characters', 'movies_characters.movies_id', 'movies.id')
        .join('characters', 'movies_characters.characters_id ', 'characters.id')
        .join('movies_genres', 'movies_genres.movies_id', 'movies.id')
        .join('genres', 'movies_genres.genres_id', 'genres.id')
        .groupBy('movies_genres.movies_id')
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
        });
    console.log(getMovies);
    return getMovies;
};

const insertMovie = async (req: Request) => {
    const trx = await knex.transaction();
    const movies = req.body.movies;
    try {
        const insertMovie = await trx('movies')
            .insert({
                image: movies.image,
                movie: movies.movie,
                year: movies.year,
                description: movies.description
            })
            .then((result: any) => {
                return result;
            })
            .catch((error: any) => {
                console.log(error);
                throw new Error();
            });
        const movieID = insertMovie[0];
    } catch (ex: any) {
        await trx.rollback();
    }
};
export default getAllMovies;
