import pratosRouter from "@modules/pratos/routes/pratos.routes";
import restaurantesRouter from "@modules/restaurantes/routes/restaurantes.routes";
import ResetPasswordController from "@modules/users/controllers/ResetPasswordController";
import passwordRouter from "@modules/users/routes/password.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();
const passwordController = new ResetPasswordController();

routes.use('/restaurantes', restaurantesRouter)
routes.use('/pratos', pratosRouter)
routes.use('/user', usersRouter)
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.get('/reset-password', passwordController.showResetPage);
routes.get('/', (request, response) =>{
    response.json({message: 'Hello Dev!'});
    return;
})

export default routes;
