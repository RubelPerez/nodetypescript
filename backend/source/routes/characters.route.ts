import express from 'express';
import * as charactersController from '../controllers/characters.controller'
const router = express.Router();

router.get("/getCharacters", charactersController.getAllCharactersController)
router.get("/getCharacterByID/:id", charactersController.getCharacterByIDController)
router.post("/insertCharacter", charactersController.insertCharactersController)
router.delete("/deleteCharacters", charactersController.deleteCharacterController)
router.put("/updateCharacter", charactersController.updateCharactersController)

export = router;
