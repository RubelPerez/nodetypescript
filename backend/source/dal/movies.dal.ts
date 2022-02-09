import { Request } from 'express';
import knex from '../config/config';
import { insertMovieCharacters, getMovieCharacters, deleteMovieCharacters } from './movies_characters.dal';
import { insertMovieGenres, getMovieGenres, deleteMovieGenres } from './movies_genres.dal';

const getAllMovies = async (req: Request) => {
    const getMovies = await knex('movies')
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
        });

    // const getMovies = await knex('movies')
    //     .select('*', knex.raw('CONCAT("[",GROUP_CONCAT(DISTINCT (genres.genre)),"]") as genre')
    //         , knex.raw('CONCAT("[",GROUP_CONCAT(DISTINCT (characters.charac)),"]") as charac'))
    //     .join('movies_characters', 'movies_characters.movies_id', 'movies.id')
    //     .join('characters', 'movies_characters.characters_id ', 'characters.id')
    //     .join('movies_genres', 'movies_genres.movies_id', 'movies.id')
    //     .join('genres', 'movies_genres.genres_id', 'genres.id')
    //     .groupBy('movies_genres.movies_id')
    //     .then((result: any) => {
    //         return result;
    //     })
    //     .catch((error: any) => {
    //         console.log(error);
    //     });
    return getMovies;
};

const getMovieByID = async (req: Request) => {
    const getMovies = await knex('movies')
        .where({
            id: req.params.id
        })
        .then((result: any) => {
            return result;
        })
        .catch((error: unknown) => {
            console.log(error);
        });
    const getCharacter = await getMovieCharacters(req.params.id);
    const getGenre = await getMovieGenres(req.params.id);
    return { getMovies, getCharacter, getGenre };
};

const insertMovie = async (movie: any, genres: any[], characters: any[]) => {
    const trx = await knex.transaction();
    try {
        const insertMovie = await trx('movies')
            .insert({
                image: movie.image,
                movie: movie.movie,
                year: movie.year,
                description: movie.description
            })
            .then((result: any) => {
                return result;
            })
            .catch((error: any) => {
                console.log(error);
                throw new Error();
            });
        if (characters.length > 0) {
            characters.forEach((character: any) => {
                if (!insertMovieCharacters(character.value, insertMovie[0])) {
                    throw new Error();
                }
            });
        }
        if (genres.length > 0) {
            genres.forEach((genre: any) => {
                if (!insertMovieGenres(genre.value, insertMovie[0])) {
                    throw new Error();
                }
            });
        }

        await trx.commit();
        return true;
    } catch (ex: any) {
        console.log(ex);
        await trx.rollback();
        return false;
    }
};
const verifyIfExistsMovies = async (movie: any) => {
    const verifyMovie = await knex('movies')
        .where({
            movie: movie.movie
        })
        .modify(function (queryBuilder: any) {
            if (movie.id > 0) {
                queryBuilder.andWhereNot('id', '=', movie.id);
            }
        })
        .count('* as Duplicated')
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err);
            return false;
        });
    if (verifyMovie[0].Duplicated == 0) {
        return true;
    } else {
        return false;
    }
};
const updateMovie = async (movies: any) => {
    const updateMovies = await knex('movies')
        .update({
            movie: movies.movie,
            year: movies.year,
            description: movies.description,
            genre: movies.genre
        })
        .where({
            id: movies.id
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err);
            return false;
        });
    return updateMovies;
};
const deleteMovie = async (movieID: Number) => {
    const trx = await knex.transaction();

    try {
        const delMovie = await knex('movies')
            .where({ id: movieID })
            .del()
            .then((result: any) => {
                return result;
            })
            .catch((error: any) => {
                console.log(error);
                throw new Error();
            });

        const deleteMovieGenre = await deleteMovieGenres(movieID);
        if (!deleteMovieGenre) {
            throw new Error();
        }

        const deleteMovieCharacter = await deleteMovieCharacters(movieID);
        if (!deleteMovieCharacter) {
            throw new Error();
        }

        await trx.commit();
        return true;
    } catch (ex: unknown) {
        await trx.rollback();
        return false;
    }
};
export { getAllMovies, insertMovie, updateMovie, deleteMovie, getMovieByID, verifyIfExistsMovies };
