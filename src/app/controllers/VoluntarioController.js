import CreateVoluntarioService from '../services/Voluntario/CreateVoluntarioService';
import UpdateVoluntarioService from '../services/Voluntario/UpdateVoluntarioService';
import VoluntarioRepository from '../repositories/VoluntarioRepository';

class VoluntarioController {
  async create(req, res) {
    const voluntarioService = new CreateVoluntarioService();
    const createVoluntario = await voluntarioService.execute(req.body);

    return res.json(createVoluntario);
  }

  async update(req, res) {
    const voluntarioService = new UpdateVoluntarioService();
    const data = { id: req.params.id, updateData: req.body };
    const createVoluntario = await voluntarioService.execute(data);

    return res.json(createVoluntario);
  }

  async get(req, res) {
    const voluntarios = await VoluntarioRepository.getAll();

    return res.json(voluntarios);
  }

  async delete(req, res) {
    const voluntario = await VoluntarioRepository.delete(req.params.id);

    return res.json(voluntario);
  }
}

export default new VoluntarioController();
