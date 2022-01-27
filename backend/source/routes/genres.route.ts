import express from 'express';
import * as genresController from '../controllers/genres.controller'
import genres from '../middleware/validations/genres.validation'

const router = express.Router();

router.get("/getGenres", genresController.getAllGenresController)
router.get("/getGenreByID/:id", genresController.getGenresByIDController)
router.post("/insertGenre", genresController.insertGenresController)
router.delete("/deleteGenres", genresController.deleteGenresController)
router.put("/updateGenre", genresController.updateGenresController)



export = router;
