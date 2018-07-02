
import * as http from 'http';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { errorHandlerApi } from './errorHandler';
import DataBase from './config/mongo/db';
import * as cors from "cors";

import UsuarioController from './controllers/usuarioController';

const config = require('./config/env/config')();

class Server {
    public app: express.Application;
    private database: DataBase;

    server: any;
    io: any;

    constructor(){
        this.app = express();
        this.listen();
        this.middleware();
        this.database = new DataBase();
        this.dataBaseConnection();
        this.router();
    }
    
    listen() {
        this.server = http.createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.io.on('connection', (client) => {
            console.log('cliente conectado ! ' + client.id);
            // client.on('request-event', (value) => {
            //     io.emit('response-event', { refresh: value });
            // });
        });

        this.io.on('disconnect', (client) => {
            console.log('cliente desconectado ! ' + client.id);
        });

        this.server.listen(config.port);
        this.server.on('listening', () => console.log(`server está rodando na porta ${config.port}`));
        this.server.on('error', (error: NodeJS.ErrnoException) => console.log(`ocorreu um erro ${error}`));
    }

    dataBaseConnection() {
        this.database.createConnection();
    }

    middleware (): void {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded( { extended: true } ));
        this.app.use(bodyParser.json());
        this.app.use(errorHandlerApi);
        this.router();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };

        this.app.use(cors(options));
    }

    router(): void {
        
        this.app.route('/v1/usuario').get(UsuarioController.listar);
        this.app.route('/v1/usuario').post(UsuarioController.criar);
        this.app.route('/v1/usuario/:id').get(UsuarioController.recuperar);        
        this.app.route('/v1/usuario/:id').put(UsuarioController.atualizar);
        this.app.route('/v1/usuario/:id').delete(UsuarioController.remover);
    }
}

export default new Server().app;