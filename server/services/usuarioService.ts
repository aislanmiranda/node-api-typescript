const jwt = require('jsonwebtoken');
const config = require('./../config/env/config')();

class UsuarioService {
    
    constructor() { }
        
    gerarToken(params:any = {}) {
        return jwt.sign(params, config.secret, {
            expiresIn: 86400 //parametros em segundos = 1 dia
         });
    }

    decifrarToken(token:string)
    {
        let decoded = jwt.verify(token, config.secret);
        return decoded;
    }

}

export default new UsuarioService();