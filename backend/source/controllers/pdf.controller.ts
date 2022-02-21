import { NextFunction, Request, Response } from 'express';
import knex from './../config/config';
import nodemailer from 'nodemailer';
import { getPDFMovie } from '../dal/pdf.dal';
import * as pdf from 'html-pdf';

var options: pdf.CreateOptions = { format: 'Letter', localUrlAccess: true };



const moviePDFController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const getMovie = await getPDFMovie(id)


    let html = `
    
    ${getMovie[0].id}
    `
    pdf.create(html).toBuffer(function (err, result) {
        if (err) {
            return console.log(err);
        }
        else {
           
            res.send({pdf:result})
        }
    });
}

export { moviePDFController };
