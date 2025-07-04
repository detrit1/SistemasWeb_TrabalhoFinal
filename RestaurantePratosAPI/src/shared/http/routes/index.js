"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/', (request, response) => {
    response.json({ message: 'Hello Dev!' });
    return;
});
exports.default = routes;
