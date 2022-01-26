import { NextFunction, Request, Response } from 'express';
import { getAllMovies, insertMovie, getMovieByID, deleteMovie } from '../dal/movies.dal';

const getMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    const movies = await getAllMovies(req).then((result: any) => { return result })
    res.send({ movies })
};

const insertMoviesController = async (req: Request, res: Response, next: NextFunction) => {
   
    const insert = await insertMovie(req)
        .then((result: any) => {
            return result
        })
        .catch((ex: any) => {
            console.log(ex)
            return ex
        })
    if (insert) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }

};

const getMovieByIDController = async (req: Request, res: Response, next: NextFunction) => {

    const getMoviesByID = await getMovieByID(req)
    if (getMoviesByID) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }
}

const deleteMoviesController = async (req: Request, res: Response, next: NextFunction) => {
    const deleteMovieDB = await deleteMovie(req)
    if (deleteMovieDB) {

        res.send({ msg: 'ok' })
    }
    else {

        res.send({ msg: 'error' })
    }

}
export { getMoviesController, insertMoviesController, getMovieByIDController, deleteMoviesController }
