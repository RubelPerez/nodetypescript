import { Request } from 'express';
import knex from '../config/config';

const getAllCharacters = async (req: Request) => {
    const characters = await knex('characters')
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return err;
        })

    return characters;
}
const insertCharacters = async (req: Request) => {

    const insertCharacter = await knex('characters')
        .insert
        ({
            image: null,
            charac: req.body.character
        })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return err;
        })
    return insertCharacter;
}

const getCharactersByID = async (req: Request) => {
    const characters = await knex('characters')
        .where({ id: parseInt(req.params.id) })
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return err;
        })

    return characters;
}


const verifyIfExistsCharacters = async (req: Request) => {

    const verifyCharacter = await knex('characters')
        .where
        ({
            charac: req.body.character
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
            return err;
        })
    if (verifyCharacter.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
const updateCharacters = async (req: Request) => {

    const updateCharacter = await knex('characters')
        .update
        ({

            charac: req.body.character
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
            return err;
        })
    return updateCharacter;
}

const deleteCharacters = async (req: Request) => {
    const deleteCharacter = await knex('characters')
        .where({ id: req.body.id })
        .del()
        .then((result: any) => {
            return result;
        })
        .catch((err: any) => {
            console.log(err)
            return err;
        })
    return deleteCharacter;
}
export { getAllCharacters, getCharactersByID, insertCharacters, verifyIfExistsCharacters, updateCharacters, deleteCharacters }