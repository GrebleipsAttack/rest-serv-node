const express = require('express');
const cors = require('cors');
const fileUpload =  require('express-fileupload');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users:  '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            upload: '/api/upload'
        }
        
        
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
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes'));
        this.app.use( this.paths.categories, require('../routes/categories.routes'));
        this.app.use( this.paths.users, require('../routes/user.routes'));
        this.app.use( this.paths.products,require('../routes/products.routes'));
        this.app.use( this.paths.search,require('../routes/search.routes'));
        this.app.use( this.paths.upload,require('../routes/upload.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server run in port ${this.port}`);
        } );
    }
}

module.exports = Server;