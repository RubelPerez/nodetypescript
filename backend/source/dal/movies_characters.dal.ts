import { Request } from 'express';
import knex from '../config/config';

const insertMovieCharacters = async (character: any, id: any) => {
    const insertMoviesGenres = await knex("movies_characters")
        .insert
        ({
            movies_id: id,
            characters_id: character
        })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });
}


export default insertMovieCharacters;