import { Request, Response, NextFunction } from 'express';
import { deleteGenres, getAllGenres, getGenresByID, insertGenres, updateGenres, verifyIfExistsGenres } from '../dal/genres.dal';

const getAllGenresController = async (req: Request, res: Response, next: NextFunction) => {

    const getAllGenre = await getAllGenres(req)
    if (getAllGenre) {
        res.send({ getAllGenre })
    }
    else {
        res.send({ msg: 'error' })
    }

}

const getGenresByIDController = async (req: Request, res: Response, next: NextFunction) => {
    const getGenreByID = await getGenresByID(req)
    if (getGenreByID) {
        res.send({ getGenreByID })
    } else {
        res.send({ msg: 'error' })
    }
}
const insertGenresController = async (req: Request, res: Response, next: NextFunction) => {
    const verifyGenres = await verifyIfExistsGenres(req)
    if (verifyGenres) {
        res.send({ msg: 'duplicated Genres' })
    }
    else {

        const insertGenre = await insertGenres(req)
        res.send({ msg: 'ok' })

    }
}
const deleteGenresController = async (req: Request, res: Response, next: NextFunction) => {
    const deleteGenre = await deleteGenres(req)
    if (deleteGenre) {
        res.send({ msg: 'ok' })
    }
    else {
        res.send({ msg: 'error' })
    }
}
const updateGenresController = async (req: Request, res: Response, next: NextFunction) => {
    const verifyGenres = await verifyIfExistsGenres(req)
    if (verifyGenres) {
        res.send({ msg: 'duplicated Genres' })
    }
    else {

        const updateGenre = await updateGenres(req)
        res.send({ msg: 'ok' })

    }
}

export {
    getAllGenresController,
    getGenresByIDController,
    insertGenresController,
    deleteGenresController,
    updateGenresController
}