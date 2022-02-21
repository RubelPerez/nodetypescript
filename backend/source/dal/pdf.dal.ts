import knex from '../config/config';



const getPDFMovie = async (id: number) => {
    const movie = await knex('movies')
        .where({ id: 1 })
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            console.log(error);
            throw new Error();
        });
   
    return movie;
}

export { getPDFMovie }