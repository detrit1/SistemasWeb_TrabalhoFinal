import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import uploadConfig from "@config/upload";
import multer from "multer";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig);


usersRouter.get('/user', isAuthenticated, async(req, res, next) => {
    try{
        await usersController.index(req, res, next);
    }catch(err){
        next(err);
    }
});

usersRouter.post('/user', 
    celebrate({
        [Segments.BODY] : {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }
    }),
    async(req, res, next) => {
    try{
        await usersController.create(req, res, next);
    }catch(err){
        next(err);
    }
});

export default usersRouter