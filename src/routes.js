import { Router } from 'express';
import VoluntarioController from './app/controllers/VoluntarioController';

const routes = new Router();

routes.post('/voluntario', VoluntarioController.create);

export default routes;
