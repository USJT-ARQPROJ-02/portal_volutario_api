import { Router } from 'express';
import VoluntarioController from './app/controllers/VoluntarioController';

const routes = new Router();

routes.get('/voluntario', VoluntarioController.get);
routes.post('/voluntario', VoluntarioController.create);
routes.put('/voluntario/:id', VoluntarioController.update);
routes.delete('/voluntario/:id', VoluntarioController.delete);

export default routes;
