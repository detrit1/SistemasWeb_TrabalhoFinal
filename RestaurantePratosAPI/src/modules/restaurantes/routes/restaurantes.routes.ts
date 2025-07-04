import { Router } from 'express';
import RestaurantesController from '../typeorm/controller/RestaurantesController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { errors } from 'celebrate';

const restaurantesRouter = Router();
const restauranteController = new RestaurantesController(); // instanciando a classe

restaurantesRouter.get('/restaurantes', async (req, res, next) => {
  try {
    await restauranteController.list(req, res, next);
  } catch (err) {
    next(err);
  }
});

restaurantesRouter.get('/restaurantes/:id', async (req, res, next) => {
  try {
    await restauranteController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

restaurantesRouter.post('/restaurantes', celebrate({
        [Segments.BODY] : {
            nome: Joi.string().required(),
            capacidade_clientes: Joi.number().min(0).required(),
            endereco: Joi.string().required(),
            descricao: Joi.string().required(),
            nota_restaurante: Joi.number().min(0).max(10).precision(2).default(0).required()
        }
    }), isAuthenticated, async (req, res, next) => {
  try {
    await restauranteController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

restaurantesRouter.put('/restaurantes/:id', isAuthenticated, celebrate({
        [Segments.BODY] : {
            nome: Joi.string().required(),
            capacidade_clientes: Joi.number().min(0),
            endereco: Joi.string(),
            descricao: Joi.string(),
            nota_restaurante: Joi.number().min(0).max(10).precision(2).default(0)
        }
    }), async (req, res, next) => {
  try {
    await restauranteController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

restaurantesRouter.delete('/restaurantes/:id', isAuthenticated, async (req, res, next) => {
  try {
    await restauranteController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});
restaurantesRouter.use(errors());
export default restaurantesRouter;
