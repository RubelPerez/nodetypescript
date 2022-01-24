const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'phpmyadmin',
        password: 'root',
        database: 'db_movies'
    }
});

export default knex;