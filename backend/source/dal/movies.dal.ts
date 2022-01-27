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
    const getMovies = await knex("movies")
        .where({
            id: req.params.id
        })
        .then((result: any) => {
            return result;
        })
        .catch((error: unknown) => {
            console.log(error);
        });
    const getCharacter = await getMovieCharacters(req.params.id)
    const getGenre = await getMovieGenres(req.params.id)
    return { getMovies, getCharacter, getGenre }


}

const insertMovie = async (req: Request) => {
    console.log("insert movie")
    const trx = await knex.transaction();
    const movie = req.body.movie;
    const genres = req.body.selectedGenres;
    const characters = req.body.selectedCharacters;
    console.log({ movie })
    console.log({ characters })
    console.log({ genres })
    try {
        const insertMovie = await trx('movies')
            .insert({
                image: movie.image,
                movie: movie.movies,
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

        characters?.forEach((character: any) => {
            // console.log("chara", character)
            if (!insertMovieCharacters(character.value, insertMovie[0])) {
                throw new Error();
            }

        });
        genres?.forEach((genre: any) => {
            // console.log("genre", genre)
            if (!insertMovieGenres(genre.value, insertMovie[0])) {
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
const verifyIfExistsMovies = async (req: Request) => {
    console.log("verify movie")
    const verifyGenres = await knex('movies')
        .where
        ({
            movie: req.body.movie.movies
        })
        .modify(function (queryBuilder: any) {
            if (req.body.movie.id > 0) {
                queryBuilder.andWhereNot("id", "=", req.body.movie.id);
            }
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })
    if (verifyGenres.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
const updateMovie = async (req: any) => {
    const updateMovies = await knex('movies')
        .update
        ({
            movie: req.body.movies,
            year: req.body.year,
            description: req.body.description,
            genre: req.body.genre
        })
        .where
        ({
            "id": req.body.id
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })
    return updateMovies;
}
const deleteMovie = async (req: any) => {
    const genresID = req.body.genre_id;
    const charactersID = req.body.character_id
    const movieID = req.body.movie_id

    const trx = await knex.transaction();
    try {
        const delMovie = await knex("movies")
            .where({ id: movieID })
            .del()
            .then((result: any) => {
                return result;
            })
            .catch((error: any) => {
                console.log(error);
                throw new Error();
            });
        genresID.forEach(async (genre_id: any) => {
            const deleteMovieGenre = await deleteMovieGenres(movieID, genre_id);
            if (!deleteMovieGenre) {
                throw new Error();
            }
        });
        charactersID.forEach(async (character_id: any) => {
            const deleteMovieCharacter = await deleteMovieCharacters(movieID, character_id);
            if (!deleteMovieCharacter) {
                throw new Error();
            }
        });

        await trx.commit();
        return true;
    }
    catch (ex: unknown) {
        await trx.rollback();
        return false;
    }
}
export { getAllMovies, insertMovie, updateMovie, deleteMovie, getMovieByID, verifyIfExistsMovies };
