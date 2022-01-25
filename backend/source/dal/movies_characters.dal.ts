import { Request } from 'express';
import knex from '../config/config';

const insertMovieCharacters = async (character_id: number, movie_id: number) => {
    const insertMoviesCharacter = await knex("movies_characters")
        .insert
        ({
            movies_id: movie_id,
            characters_id: character_id
        })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });

    if (insertMoviesCharacter) {
        return true
    }
    else {
        return false;
    }
}

const getMovieCharacters = async (movie_id: any) => {
    const getMovieCharacter = await knex("movies_characters")
        .join("characters", "characters.id", "movies_characters.characters_id")
        .where({ "movies_characters.movies_id": movie_id })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });
    return getMovieCharacter;
}
const deleteMovieCharacters = async (character_id: number, movie_id: number) => {
   
    const deleteMovieCharacter = await knex("movies_characters")
        .where({
            movies_id: movie_id,
            characters_id: character_id
        })
        .del()
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });

    if (deleteMovieCharacter) {
        return true
    } else {
        return false;
    }
}
export { insertMovieCharacters, getMovieCharacters, deleteMovieCharacters };