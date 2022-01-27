import express from 'express'
import * as controller from '../controllers/movies_genres.controller'

const router = express.Router();

router.get("/getMoviesGenresByID/:id",controller.getMoviesGenresByIDController)
router.post("/insertMoviesGenre", controller.insertMovieGenresController)
router.delete("/deleteMoviesGenre", controller.deleteMovieGenresController)




export = router;