import express from 'express';
import * as moviesController from '../controllers/movies.controller';
import movie from '../middleware/validations/movies.validation'
const router = express.Router();

router.get('/getMovies', moviesController.getMoviesController);
router.post('/insertMovie', movie.insertMovie, moviesController.insertMoviesController);
router.get('/getmovieByID/:id', moviesController.getMovieByIDController);
// router.put('/updateMovie',moviesController)
router.delete('/deleteMovie', moviesController.deleteMoviesController)

export = router;
