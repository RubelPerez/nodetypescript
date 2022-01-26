import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import knex from '../../config/config'


const secret = 'eThicLine';

const auth = async function (req: Request, res: Response, next: NextFunction) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, async function (err: any, decoded: any) {

            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                const session = await knex('admin_users')
                    .where({ user: decoded.user }).then((result: any) => { return result })



                /**************************************************************
                Variables que se manejan para la sesion, 
                usar para cuando se quiera saber la sesion actual del usuario
                **************************************************************/
                const id = session.id;
                const user = session.user;
                const name = session.name;
                const lastname = session.lastname;
                const email = session.email;
                const type_user = session.type_user;

                next();
            }
        });
    }
}

module.exports = auth;