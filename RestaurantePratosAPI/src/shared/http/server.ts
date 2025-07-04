import 'reflect-metadata';
import cors from 'cors';
import routes from './routes';
import express, { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import restaurantesRoutes from '@modules/restaurantes/routes/restaurantes.routes';
import pratosRoutes from '@modules/pratos/routes/pratos.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error: Error, request: Request, response : Response, next: NextFunction)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

app.use(restaurantesRoutes);
app.use(pratosRoutes);
app.use(usersRouter);
app.use(sessionsRouter);
app.use(passwordRouter);
app.listen(3333, () => {
    console.log('Server started on port 3333!');
})
