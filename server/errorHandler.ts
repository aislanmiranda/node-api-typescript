import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export function errorHandlerApi (err: ErrorRequestHandler, req: Request, 
    res: Response, next: NextFunction) {

    console.log(`API error handler foi executado: ${err}`);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Erro interno do servidor'
    });
    
}