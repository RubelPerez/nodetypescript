import { Request } from 'express';
import knex from '../config/config';

const insertMovieGenres = async (genre: any, id: any) => {
    const insertMoviesGenres = await knex("movies_genres")
        .insert
        ({
            movies_id: id,
            genres_id: genre
        })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });
    if (insertMoviesGenres) {
        return true;
    }
    else {
        return false;
    }
}

const getMovieGenres = async (genre_id: any) => {
    const getMovieGenre = await knex("movies_genres")
        .join("genres", "genres.id", "movies_genres.genres_id")
        .where({ "movies_genres.movies_id": genre_id })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });

    return getMovieGenre;
}

const deleteMovieGenres = async (movie_id: any, genre_id: any) => {
    const deleteMovieGenre = await knex("movies_genres")
        .where({
            movies_id: movie_id,
            genres_id: genre_id
        })
        .del()
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });

    if (deleteMovieGenre) {
        return true
    } else {
        return false;
    }
}
export { insertMovieGenres, getMovieGenres, deleteMovieGenres };