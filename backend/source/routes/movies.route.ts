import express from 'express';
import moviesController from '../controllers/movies.controller';

const router = express.Router();

router.get('/getMovies', moviesController.getMovies);

export = router;
