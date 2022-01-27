
// import { Request, Response, NextFunction } from 'express';
// import { body, validationResult } from 'express-validator';

// const cleanMovieBody = [

//     body('movies')
//         .notEmpty()
//         // .escape()
//         .isLength({ min: 3, max: 200 })
//         .trim()
//     ,
//     body('year')
//         .notEmpty()
//         .isNumeric()
//         .trim(),
//     body('description')
//         .notEmpty()
//         .escape()
//         .isLength({ min: 3, max: 500 })
//         .trim(),

//     (req: Request, res: Response, next: NextFunction) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             console.log("si que llego al backend, pero explota la validacion")
//             return res.status(422).json({ errors: errors.array() });
//         }
//         else {
//             next();
//         }
//     }
// ];


// export = { cleanMovieBody }