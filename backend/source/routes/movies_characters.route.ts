import express from 'express';
import * as controller from '../controllers/movies_characters.controller';

const router = express.Router();
router.get("/getMoviesCharacterByID/:id",controller.getMoviesGenresByIDController)
router.post("/insertMoviesCharacter", controller.insertMovieCharactersController)
router.delete("/deleteMoviesCharacter", controller.deleteMovieCharactersController)
router.delete("/deleteMoviesCharacterByMovie",controller.deleteMovieCharactersByMovieController)

export = router;
