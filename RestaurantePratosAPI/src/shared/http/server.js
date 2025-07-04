"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
require("@shared/typeorm");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.default) {
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
app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
