import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import loginRoute from './routes/login.route'
import moviesRoute from './routes/movies.route'
import modifyCharacters from './routes/movies_characters.route'
import modifyGenres from './routes/movies_genres.route'
import cors from 'cors'
const port = 8080
const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* API RULES */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes */
app.use('/api/login', loginRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/modifyMoviesCharacters', modifyCharacters);
app.use('/api/modifyMoviesGenres', modifyGenres);
/** ERROR CASE*/
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
})