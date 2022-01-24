import { NextFunction, Request, Response } from 'express';
import { getAllMovies, insertMovie } from '../dal/movies.dal';


const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    const movies = await getAllMovies(req).then((result: any) => { return result })
    res.send({ movies })
};

const insertMovies = async (req: Request, res: Response, next: NextFunction) => {
    const insert = await insertMovie(req)
        .then((result: any) => {
            return result
        })
        .catch((ex: any) => {
            return ex
        })
    if (insert) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }

};


export { getMovies, insertMovies }
