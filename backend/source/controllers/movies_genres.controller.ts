import { Request, Response, NextFunction } from 'express';
import { insertMovieGenres, getMovieGenres, deleteMovieGenres } from '../dal/movies_genres.dal';

const getMoviesGenresByIDController = async (req: Request, res: Response) => {
    const getMovieGenre = await getMovieGenres(parseInt(req.params.id));
    if (getMovieGenre) {
        res.send({ getMovieGenre });
    } else {
        res.send({ msg: 'error' });
    }
};

const insertMovieGenresController = async (req: Request, res: Response, next: NextFunction) => {
    const genre_id: number = req.body.genre_id;
    const movie_id: number = req.body.movie_id;
    const insertMovieGenre = await insertMovieGenres(genre_id, movie_id);
    if (insertMovieGenre) {
        res.send({ msg: 'ok' });
    } else {
        res.send({ msg: 'error' });
    }
};

const deleteMovieGenresController = async (req: Request, res: Response, next: NextFunction) => {
    const movie_id: number = req.body.movie_id;
    const deletetMovieGenre = await deleteMovieGenres(movie_id);
    if (deletetMovieGenre) {
        res.send({ msg: 'ok' });
    } else {
        res.send({ msg: 'error' });
    }
};

export { insertMovieGenresController, deleteMovieGenresController, getMoviesGenresByIDController };
