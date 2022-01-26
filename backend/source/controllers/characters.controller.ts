import { Request, Response, NextFunction } from 'express';
import {
    deleteCharacters,
    getAllCharacters,
    getCharactersByID,
    insertCharacters,
    updateCharacters,
    verifyIfExistsCharacters
}
    from '../dal/characters.dal';


const getAllCharactersController = async (req: Request, res: Response, next: NextFunction) => {
    const getCharacters = await getAllCharacters(req);
    if (getCharacters) {
        res.send({ getCharacters })
    }
    else {
        res.send({ msg: 'error' })
    }
}

const insertCharactersController = async (req: Request, res: Response, next: NextFunction) => {
    const verifyCharacter = await verifyIfExistsCharacters(req)
    if (verifyCharacter) {
        res.send({ msg: 'duplicated character' })
    }
    else {

        const insertCharacter = await insertCharacters(req)
        res.send({ msg: 'ok' })

    }

}
const getCharacterByIDController = async (req: Request, res: Response, next: NextFunction) => {
    const getCharacterByID = await getCharactersByID(req)
    if (getCharacterByID) {
        res.send({ getCharacterByID })
    } else {
        res.send({ msg: 'error' })
    }
}
const updateCharactersController = async (req: Request, res: Response, next: NextFunction) => {
    const verifyCharacter = await verifyIfExistsCharacters(req)
    if (verifyCharacter) {
        res.send({ msg: 'duplicated character' })
    }
    else {

        const updateCharacter = await updateCharacters(req)
        res.send({ msg: 'ok' })

    }
}

const deleteCharacterController = async (req: Request, res: Response, next: NextFunction) => {
    const deleteCharacter = await deleteCharacters(req)
    console.log({ deleteCharacter })
    if (deleteCharacter) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }
}

export {
    getAllCharactersController,
    insertCharactersController,
    updateCharactersController,
    getCharacterByIDController,
    deleteCharacterController
}