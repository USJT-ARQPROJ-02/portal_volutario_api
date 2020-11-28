import { Router } from 'express';
import multer from 'multer';

import VoluntarioController from './app/controllers/VoluntarioController';
import EntidadeController from './app/controllers/EntidadeController';
import NecessidadeController from './app/controllers/NecessidadeController';
import CandidaturaController from './app/controllers/CandidaturaController';
import SessionController from './app/controllers/SessionController';
import authEntidade from './app/middlewares/authEntidade';
import { donateMulterConfig, necessidadeMulterConfig } from './config/multer';
import authVoluntario from './app/middlewares/authVoluntario';
import ResetToken from './app/models/ResetToken';
import EnviarEmail from './app/services/ResetPassword/EnviarEmail';
import ResetSenhaService from './app/services/ResetPassword/ResetSenhaService';
import Necessidade from './app/models/Necessidade';

const upload = multer(donateMulterConfig);

const uploadNecessidade = multer(necessidadeMulterConfig);

const routes = new Router();

routes.post('/doar', upload.single('file'), (req, res) => {
  return res.json('Upload realizado com sucesso');
});

routes.put(
  '/necessidade/:id',
  uploadNecessidade.array('files', 10),
  NecessidadeController.update
);

routes.post('/reset', EnviarEmail.execute);
routes.post('/reset/novasenha', ResetSenhaService.execute);

routes.get('/voluntario', VoluntarioController.get);
routes.post('/voluntario', VoluntarioController.create);
routes.put('/voluntario/:id', VoluntarioController.update);
routes.delete('/voluntario/:id', VoluntarioController.delete);

routes.get('/perfil', authVoluntario, VoluntarioController.getMyself);

routes.post('/voluntario/login', SessionController.loginVoluntario);
routes.post('/entidade/login', SessionController.loginEntidade);

routes.get('/entidade', EntidadeController.get);
routes.post('/entidade', EntidadeController.create);
routes.put('/entidade/:id', EntidadeController.update);
routes.delete('/entidade/:id', EntidadeController.delete);

routes.get('/entidade/necessidades/:id', authEntidade, NecessidadeController.getMyEntidade);

routes.get('/necessidade', NecessidadeController.get);

routes.get('/necessidade/encerradas', NecessidadeController.getEncerradas);

routes.get(
  '/necessidade/dashboard',
  NecessidadeController.getEncerradasDashboard
);

// buscar  necessidades pelas preferencias do usuario
routes.get(
  '/necessidade/voluntario',
  authVoluntario,
  NecessidadeController.getByPreferences
);

routes.post('/necessidade', authEntidade, NecessidadeController.create);
routes.put('/necessidade/:id', NecessidadeController.update);
routes.delete('/necessidade/:id', NecessidadeController.delete);

// buscar necessidades encerradas Entidade
routes.get(
  '/necessidade/entidade',
  authEntidade,
  NecessidadeController.getEncerradasEntidade
);
// voluntario
routes.get(
  '/candidatura/voluntario/encerradas',
  authVoluntario,
  CandidaturaController.getCandidaturasVoluntariosEncerradas
);

//
routes.get('/candidatura', authEntidade, CandidaturaController.get);
routes.post('/candidatura', authVoluntario, CandidaturaController.create);
routes.put(
  '/candidatura/:id',
  authEntidade,
  CandidaturaController.updateStatus
);
routes.delete('/candidatura/:id', CandidaturaController.delete);

// buscar candidaturas voluntario
routes.get(
  '/candidatura/voluntario',
  authVoluntario,
  CandidaturaController.getCandidaturasVoluntario
);

// buscar candidaturas encerradas voluntario
routes.get(
  '/candidatura/voluntario/:id',
  CandidaturaController.getCandidaturasVoluntariosEncerradas2
);

export default routes;
