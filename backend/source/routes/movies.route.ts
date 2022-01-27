import express from 'express';
import * as moviesController from '../controllers/movies.controller';
// import movie from '../middleware/validations/movies.validation'
const router = express.Router();
//TODO
router.get('/getMovies', moviesController.getMoviesController);
router.post('/insertMovie', /*movie.cleanMovieBody,*/ moviesController.insertMoviesController);
router.get('/getmovieByID/:id', moviesController.getMovieByIDController);
router.put('/updateMovie',/*movie.cleanMovieBody,*/ moviesController.updateMovieController)
router.delete('/deleteMovie', moviesController.deleteMoviesController)

export = router;
