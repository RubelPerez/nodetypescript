import { NextFunction, Request, Response } from 'express';
import getAllMovies from '../dal/movies.dal';


const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    const movies = await getAllMovies(req).then((result: any) => { return result })
    res.send({ movies })
};

export default { getMovies };
