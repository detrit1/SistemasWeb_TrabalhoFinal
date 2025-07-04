
import { Request, Response, NextFunction } from 'express';
import ListPratoService from '../services/ListPratoService';
import ShowPratoService from '../services/ShowPratoService';
import CreatePratoService from '../services/CreatePratoService';
import UpdatePratoService from '../services/UpdatePratoService';
import DeletePratoService from '../services/DeletePratoService';

export default class PratosController {
  
public async list(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {    
      const listPratos = new ListPratoService();
      const pratos = await listPratos.execute();
      return response.json(pratos);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showPratos = new ShowPratoService();
      const prato = await showPratos.execute({ id });
      return response.json(prato);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao, restauranteId } = request.body;
      const createPrato = new CreatePratoService();
      const prato = await createPrato.execute({ nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao, restauranteId });
      return response.json(prato);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao, restaurante } = request.body;
      const { id } = request.params;
      const updatePrato = new UpdatePratoService();
      const prato = await updatePrato.execute({ id, nome, preco, tempo_preparacao, ingredientes, nota_prato, descricao});
      return response.json(prato);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deletePrato = new DeletePratoService();
      await deletePrato.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}
