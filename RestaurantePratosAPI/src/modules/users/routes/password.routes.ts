import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import { celebrate, Joi, Segments } from "celebrate";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();


passwordRouter.get('/reset_password', (req, res, next) => {
  try {
    resetPasswordController.showResetPage(req, res);
  } catch (err) {
    next(err);
  }
});

passwordRouter.post('/password/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
    },
})
, async (req, res, next) => {
    try {
        await forgotPasswordController.create(req, res, next)
    } catch (err) {
        next(err)
    }   
})

passwordRouter.post('/password/reset', celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref("password"))
    },
})
, async (req, res, next) => {
    try {
        await resetPasswordController.create(req, res, next)
    } catch (err) {
        next(err)
    }   
})


export default passwordRouter;