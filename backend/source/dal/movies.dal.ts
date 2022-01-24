import { Request } from 'express';
import knex from '../config/config';
import insertMovieCharacters from './movies_characters.dal';
import insertMovieGenres from './movies_genres.dal';

const getAllMovies = async (req: Request) => {
    const getMovies = await knex('movies')
        .select('*', knex.raw('CONCAT("[",GROUP_CONCAT(DISTINCT (genres.genre)),"]") as genre')
        ,knex.raw('CONCAT("[",GROUP_CONCAT(DISTINCT (characters.charac)),"]") as charac'))
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
    const genres = req.body.genres;
    const characters = req.body.characters;
    const description = req.body.description;
    const year = req.body.year
    const image = req.body.image
    try {
        const insertMovie = await trx('movies')
            .insert({
                image: image,
                movie: movies,
                year: year,
                description: description
            })
            .then((result: any) => {
                return result;
            })
            .catch((error: any) => {
                console.log(error);
                throw new Error();
            });

        characters.forEach((character: any) => {
            if (!insertMovieCharacters(character, insertMovie[0])) {
                throw new Error();
            }

        });
        genres.forEach((genre: any) => {
            if (!insertMovieGenres(genre, insertMovie[0])) {
                throw new Error();
            }
        });

        await trx.commit();
        return true;
    } catch (ex: any) {
        await trx.rollback();
        return false;

    }


};
export { getAllMovies, insertMovie };
