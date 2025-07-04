import { Router } from 'express';
import PratosController from '../typeorm/controller/PratosController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { errors } from 'celebrate';

// ... suas rotas ...

const pratosRouter = Router();
const pratosController = new PratosController(); // instanciando a classe

const pratoValidations = {
  create: celebrate({
    [Segments.BODY]: Joi.object({
      nome: Joi.string().required().max(100),
      preco: Joi.number().positive().precision(2).required(),
      tempo_preparacao: Joi.number().integer().positive().max(1440).required(),
      ingredientes: Joi.string().required(),
      nota_prato: Joi.number().min(0).max(10).precision(2).default(0),
      descricao: Joi.string().required(),
      restauranteId: Joi.string().uuid().required() // Mude para receber direto o ID
        .messages({
          'string.guid': 'ID do restaurante deve ser um UUID válido',
          'any.required': 'ID do restaurante é obrigatório'
        })
    })
  })
};

const pratoPutValidations = {
  create: celebrate({
    [Segments.BODY]: Joi.object({
      nome: Joi.string().max(100),
      preco: Joi.number().positive().precision(2),
      tempo_preparacao: Joi.number().integer().positive().max(1440),
      ingredientes: Joi.string(),
      nota_prato: Joi.number().min(0).max(10).precision(2).default(0),
      descricao: Joi.string(),
    })
  })
};

pratosRouter.get('/pratos', async (req, res, next) => {
  try {
    await pratosController.list(req, res, next);
  } catch (err) {
    next(err);
  }
});

pratosRouter.get('/pratos/:id', async (req, res, next) => {
  try {
    await pratosController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

pratosRouter.post('/pratos', pratoValidations.create, isAuthenticated, async (req, res, next) => {
  try {
    await pratosController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

pratosRouter.put('/pratos/:id', pratoPutValidations.create, isAuthenticated, async (req, res, next) => {
  try {
    await pratosController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

pratosRouter.delete('/pratos/:id', isAuthenticated, async (req, res, next) => {
  try {
    await pratosController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});
pratosRouter.use(errors()); // Isso formata melhor os erros de validação

export default pratosRouter;
