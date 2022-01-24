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


export default insertMovieGenres;