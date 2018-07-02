import * as mongoose from "mongoose";
const config = require('./../env/config')();

class DataBase {
    private DB_URI = `${config.mongo_server}:${config.mongo_port}/${config.mongo_base}`;
    private DB_CONNECTION;

    constructor() { }

    createConnection() {
        mongoose.connect(this.DB_URI);
        this.logger(this.DB_URI);
    }

    logger(uri) {
        this.DB_CONNECTION = mongoose.connection;
        this.DB_CONNECTION.on('connected', () => console.log(`Moogose está conectado em ${uri}`));
        this.DB_CONNECTION.on('error', error => console.error.bind(console, `Conexão Mongoose Erro: ${error}`));
        this.DB_CONNECTION.on('disconnected', () => console.log(`Moogose está desconectado em ${uri}`));
    }

    closeConnection(message, callback) {
        this.DB_CONNECTION.close(() => {
            console.log(`Mongoose conexão fechada by: ${message}`)
            callback();
        });
    }

}

export default DataBase;