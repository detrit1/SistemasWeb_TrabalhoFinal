
import { Request, Response, NextFunction } from 'express';
import ListRestauranteService from '../services/ListRestauranteService';
import ShowRestauranteService from '../services/ShowRestauranteService';
import CreateRestauranteService from '../services/CreateRestauranteService';
import UpdateRestauranteService from '../services/UpdateRestauranteService';
import DeleteRestauranteService from '../services/DeleteRestauranteService';

export default class RestaurantesController {
  

  public async list(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {    
      const listRestaurantes = new ListRestauranteService();
      const restaurantes = await listRestaurantes.execute();
      return response.json(restaurantes);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showRestaurante = new ShowRestauranteService();
      const restaurante = await showRestaurante.execute({ id });
      return response.json(restaurante);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nome, capacidade_clientes, endereco, descricao, nota_restaurante } = request.body;
      const createRestaurante = new CreateRestauranteService();
      const restaurante = await createRestaurante.execute({ nome, capacidade_clientes, endereco, descricao, nota_restaurante });
      return response.json(restaurante);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nome, capacidade_clientes, endereco, descricao, nota_restaurante } = request.body;
      const { id } = request.params;
      const updateRestaurante = new UpdateRestauranteService();
      const restaurante = await updateRestaurante.execute({ id, nome, capacidade_clientes, endereco, descricao, nota_restaurante });
      return response.json(restaurante);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteRestaurante = new DeleteRestauranteService();
      await deleteRestaurante.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}
