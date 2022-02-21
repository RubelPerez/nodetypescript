import { NextFunction, Request, Response } from 'express';
import verifiedLogin from './../dal/login.dal';
import knex from './../config/config';
import nodemailer from 'nodemailer';


const login = async (req: Request, res: Response, next: NextFunction) => {
    const login = await verifiedLogin(req).then((result: any) => { return result })

    res.send({ login })
};

export default { login };
