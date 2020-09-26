import CreateVoluntarioService from '../services/Voluntario/CreateVoluntarioService';

class VoluntarioController {
  async create(req, res) {
    const voluntarioService = new CreateVoluntarioService();
    const createVoluntario = await voluntarioService.execute(req.body);

    return res.json(createVoluntario);
  }
}

export default new VoluntarioController();
