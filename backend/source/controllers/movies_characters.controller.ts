import { NextFunction, Request, Response } from 'express';
import { insertMovieCharacters, deleteMovieCharacters } from '../dal/movies_characters.dal';

const insertMovieCharactersController = async (req: Request, res: Response, next: NextFunction) => {
    const character_id: number = req.body.character_id;
    const movie_id: number = req.body.movie_id;
    const insertMovieCharacter = await insertMovieCharacters(character_id, movie_id)
    if (insertMovieCharacter) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }

}

const deleteMovieCharactersController = async (req: Request, res: Response, next: NextFunction) => {
    const character_id: number = req.body.character_id;
    const movie_id: number = req.body.movie_id;
    const deleteMovieCharacter = await deleteMovieCharacters(character_id, movie_id)
    if (deleteMovieCharacter) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }
}


export { insertMovieCharactersController, deleteMovieCharactersController } 