const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';
        this.database();
        this.middlewares();
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
       this.app.use( this.usersRoutePath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server run in port ${this.port}`);
        } );
    }
}

module.exports = Server;