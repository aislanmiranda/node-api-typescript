import { Request, Response } from 'express';
import UsuarioService from '../services/usuarioService';
import UsuarioSchema from './../models/usuario';

class UsuarioController {
  
  constructor() {}
  
  async listar(req: Request, res: Response){

    try {
      
      const lista = await UsuarioSchema.find();

      return res.send({ 
        resultado: true,
        objeto: lista
      });

    } catch (err) {
        res.send({ resultado: false, error: 'Erro ao listar usuários: ' + err });
    }
  }

  async criar(req: Request, res: Response){

    try {

      const entity = req.body;
      const { nome, email } = req.body;
      
      entity.jwt = UsuarioService.gerarToken({ id: email });

      if (await UsuarioSchema.findOne({ nome }))
        return res.send({ 
          resultado: false, 
          mensagem: 'Nome do usuário já existente!'
        });

      const result = await UsuarioSchema.create(req.body);

      return res.send({ 
        resultado: true, 
        objeto: result
      });

    } catch (err) {
      return res.status(400)
            .send({ resultado: false, 
              error: 'Erro criar usuário: ' + err 
            });
    }

  }

  async recuperar(req: Request, res: Response){
    try {

      let entity = await UsuarioSchema.findById(req.params.id);

      if(entity)
        return res.send({ 
          resultado: true, 
          objeto: entity
        });
      else
        return res.send({ 
          resultado: false, 
          mensagem: 'Registro não encontrado' 
        });

    } catch (err) {
        res.status(400)
           .send({ 
             resultado: false, 
            mensagem: 'Erro ao recuperar registro' 
          });
    }
  }

  async atualizar(req: Request, res: Response){
    try {
      let entity = await UsuarioSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
      entity.save();
      return res.send({ 
          resultado: true, 
          objeto: entity
      });
    } catch (err) {  
      res.status(400).send({ 
        resultado: false, 
        mensagem: 'Erro ao atualizar registro: ' + err
      });
    }
  }

  async remover(req: Request, res: Response){
    try {
      await UsuarioSchema.findByIdAndRemove(req.params.id);
      return res.send({ 
        resultado: true, 
        mensagem: 'Registro removido com sucesso'
      });
    } catch (err) {
      res.status(400).send({ 
        resultado: false, 
        mensagem: 'Erro ao remover registro: ' + err 
      });
    }
  }

}

export default new UsuarioController();