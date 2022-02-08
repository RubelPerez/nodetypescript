import { NextFunction, Request, Response } from 'express';
import { getAllMovies, insertMovie, getMovieByID, deleteMovie, verifyIfExistsMovies, updateMovie } from '../dal/movies.dal';

const getMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    const movies = await getAllMovies(req).then((result: any) => {
        return result;
    });
    res.send({ movies });
};

const insertMoviesController = async (req: Request, res: Response, next: NextFunction) => {
   
    const verifyIfExistsMovie = await verifyIfExistsMovies(req);
    if (verifyIfExistsMovie) {
        res.send({ msg: 'duplicated Movie' });
    } else {
        const insert = await insertMovie(req)
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
    const deleteMovieDB = await deleteMovie(req);
    if (deleteMovieDB) {
        res.send({ msg: 'ok' });
    } else {
        res.send({ msg: 'error' });
    }
};
const updateMovieController = async (req: Request, res: Response) => {
    const verifyMovies = await verifyIfExistsMovies(req);
    if (verifyMovies) {
        res.send({ msg: 'duplicated Movies' });
    } else {
        const updateMovies = await updateMovie(req);
        res.send({ msg: 'ok' });
    }
};
export { getMoviesController, insertMoviesController, getMovieByIDController, deleteMoviesController, updateMovieController };
