import express from 'express';
import * as moviesController from '../controllers/movies.controller';

const router = express.Router();

router.get('/getMovies', moviesController.getMovies);
router.post('/insertMovie', moviesController.insertMovies);


export = router;
