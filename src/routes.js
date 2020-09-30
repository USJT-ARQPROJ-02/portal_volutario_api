import { Router } from 'express';
import VoluntarioController from './app/controllers/VoluntarioController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/voluntario', VoluntarioController.get);
routes.post('/voluntario', VoluntarioController.create);
routes.put('/voluntario/:id', VoluntarioController.update);
routes.delete('/voluntario/:id', VoluntarioController.delete);

routes.post('/voluntario/login', SessionController.loginVoluntario);

export default routes;
