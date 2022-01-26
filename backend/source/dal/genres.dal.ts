import { Request } from 'express';
import knex from '../config/config';


const getAllGenres = async (req: Request) => {
    const getAll = await knex('genres').then((result: any) => {
        return result;
    })
        .catch((err: any) => {
            console.log(err)
        })
    return getAll;
}
const insertGenres = async (req: Request) => {
    const insertGenres = await knex('genres')
        .insert
        ({
            genre: req.body.genre
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })
    return insertGenres;
}


const getGenresByID = async (req: Request) => {
    const genres = await knex('genres')
        .where({ id: parseInt(req.params.id) })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })

    return genres;
}
const verifyIfExistsGenres = async (req: Request) => {
    const verifyGenres = await knex('genres')
        .where
        ({
            genre: req.body.genre
        })
        .modify(function (queryBuilder: any) {
            if (req.body.id > 0) {
                queryBuilder.andWhereNot("id", "=", req.body.id);
            }
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })
    if (verifyGenres.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
const updateGenres = async (req: Request) => {
    const updateGenres = await knex('genres')
        .update
        ({

            genre: req.body.genre
        })
        .where
        ({
            "id": req.body.id
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })
    return updateGenres;
}
const deleteGenres = async (req: Request) => {
    const deleteGenre = await knex('genre')
        .where({ id: req.body.id })
        .del()
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return false;
        })
    return deleteGenre;
}
export {
    getAllGenres,
    insertGenres,
    getGenresByID,
    verifyIfExistsGenres,
    updateGenres,
    deleteGenres
}