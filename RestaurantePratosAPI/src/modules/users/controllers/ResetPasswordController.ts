import { NextFunction, Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController{
    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const { token, password } = request.body;
            const resetPassword = new ResetPasswordService();
            await resetPassword.execute({token, password});
            return response.status(204).json();
        }catch(err){
            next(err)
        }
    }

    public async showResetPage(request: Request, response: Response) {
  const { token } = request.query;
  
  response.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resetar Senha</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .token-box { 
          background: #f0f0f0; 
          padding: 10px; 
          margin: 10px 0; 
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <h2>Resetar Senha</h2>
      
      <div>
        <strong>Token para teste:</strong>
        <div class="token-box">${token}</div>
        <button onclick="navigator.clipboard.writeText('${token}')">
          Copiar Token
        </button>
      </div>
    </body>
    </html>
  `);
}
}