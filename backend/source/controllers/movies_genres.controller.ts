import { Request, Response, NextFunction } from 'express';
import { insertMovieGenres, getMovieGenres, deleteMovieGenres, deleteMovieGenresByMovie } from '../dal/movies_genres.dal';

const getMoviesGenresByIDController = async (req: Request, res: Response) => {
    const getMovieGenre = await getMovieGenres(parseInt(req.params.id));
    if (getMovieGenre) {
        res.send({ getMovieGenre });
    } else {
        res.send({ msg: 'error' });
    }
};

const insertMovieGenresController = async (req: Request, res: Response, next: NextFunction) => {
    const { movie_id, genre_id } = req.body;
    const insertMovieGenre = await insertMovieGenres(movie_id, genre_id);
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
const deleteMovieGenresByMovieController = async (req: Request, res: Response) => {
    const { movie_id, genre_id } = req.body;
    const deleteMovie = await deleteMovieGenresByMovie(movie_id, genre_id);
    if (deleteMovie) {
        res.send({ msg: 'ok' });
    }
};

export { insertMovieGenresController, deleteMovieGenresController, getMoviesGenresByIDController, deleteMovieGenresByMovieController };
