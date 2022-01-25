import express from 'express';
import * as controller from '../controllers/movies_characters.controller';

const router = express.Router();

router.post("/insertMoviesCharacter", controller.insertMovieCharactersController)
router.delete("/deleteMoviesCharacter", controller.deleteMovieCharactersController)

export = router;
