import * as mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    senha: {
        type: String,
        require: true
    },
    jwt: {
        type: String,
        require: false
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Usuario', UsuarioSchema, 'Usuario');