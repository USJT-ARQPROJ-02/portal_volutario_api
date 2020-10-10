import { Router } from 'express';
import VoluntarioController from './app/controllers/VoluntarioController';
import EntidadeController from './app/controllers/EntidadeController';
import NecessidadeController from './app/controllers/NecessidadeController';
import CandidaturaController from './app/controllers/CandidaturaController';
import SessionController from './app/controllers/SessionController';
import authEntidade from './app/middlewares/authEntidade';
import authVoluntario from './app/middlewares/authVoluntario';

const routes = new Router();

routes.get('/voluntario', VoluntarioController.get);
routes.post('/voluntario', VoluntarioController.create);
routes.put('/voluntario/:id', VoluntarioController.update);
routes.delete('/voluntario/:id', VoluntarioController.delete);

routes.post('/voluntario/login', SessionController.loginVoluntario);
routes.post('/entidade/login', SessionController.loginEntidade);

routes.get('/entidade', authEntidade, EntidadeController.get);
routes.post('/entidade', EntidadeController.create);
routes.put('/entidade/:id', EntidadeController.update);
routes.delete('/entidade/:id', EntidadeController.delete);

routes.get('/necessidade', NecessidadeController.get);
routes.post('/necessidade', authEntidade, NecessidadeController.create);
routes.put('/necessidade/:id', NecessidadeController.update);
routes.delete('/necessidade/:id', NecessidadeController.delete);

routes.get('/candidatura', authEntidade, CandidaturaController.get);
routes.post('/candidatura', authVoluntario, CandidaturaController.create);
routes.put(
  '/candidatura/:id',
  authEntidade,
  CandidaturaController.updateStatus
);
routes.delete('/candidatura/:id', CandidaturaController.delete);

export default routes;
