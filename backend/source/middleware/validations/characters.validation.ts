
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const cleanCharacters = [

    body('character')
        .notEmpty()
        // .escape()
        .isLength({ min: 3, max: 200 })
        .trim()
    ,

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else {
            next();
        }
    }
];

export = { cleanCharacters }