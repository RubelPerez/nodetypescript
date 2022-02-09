import { NextFunction, Request, Response } from 'express';
import { getAllMovies, insertMovie, getMovieByID, deleteMovie, verifyIfExistsMovies, updateMovie } from '../dal/movies.dal';

const getMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    const movies = await getAllMovies(req).then((result: any) => {
        return result;
    });
    res.send({ movies });
};

const insertMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    const movie = req.body.movie;
    const genres = req.body?.selectedGenres;
    const characters = req.body?.selectedCharacters;
    const verifyIfExistsMovie = await verifyIfExistsMovies(movie);
    if (verifyIfExistsMovie) {
        const insert = await insertMovie(movie, genres, characters)
            .then((result: any) => {
                return result;
            })
            .catch((ex: any) => {
                console.log(ex);
                return ex;
            });
        if (insert) {
            res.send({ msg: 'ok' });
        } else {
            res.send({ msg: 'error' });
        }
    } else {
        res.send({ msg: 'duplicated Movie' });
    }
};

const getMovieByIDController = async (req: Request, res: Response, next: NextFunction) => {
    const getMoviesByID = await getMovieByID(req);
    if (getMoviesByID) {
        res.send({ getMoviesByID });
    } else {
        res.send({ msg: 'error' });
    }
};

const deleteMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    const movie_id = req.body.movie_id;
    const deleteMovieDB = await deleteMovie(movie_id);
    if (deleteMovieDB) {
        res.send({ msg: 'ok' });
    } else {
        res.send({ msg: 'error' });
    }
};
const updateMovieController = async (req: Request, res: Response) => {
    const movie = req.body.movie;
    const verifyMovies = await verifyIfExistsMovies(movie);
    if (verifyMovies) {
        const updateMovies = await updateMovie(movie);
        res.send({ msg: 'ok' });
    } else if (!verifyMovies) {
        res.send({ msg: 'duplicated Movies' });
    }
};
export { getMoviesController, insertMoviesController, getMovieByIDController, deleteMoviesController, updateMovieController };
