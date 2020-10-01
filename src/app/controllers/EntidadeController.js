import CreateEntidadeService from '../services/Entidade/CreateEntidadeService';
import UpdateEntidadeService from '../services/Entidade/UpdateEntidadeService';
import EntidadeRepository from '../repositories/EntidadeRepository';

class EntidadeController {
  async create(req, res) {
    const entidadeService = new CreateEntidadeService();
    const createEntidade = await entidadeService.execute(req.body);

    return res.json(createEntidade);
  }

  async update(req, res) {
    const entidadeService = new UpdateEntidadeService();
    const data = { id: req.params.id, updateData: req.body };
    const updateEntidade = await entidadeService.execute(data);

    return res.json(updateEntidade);
  }

  async get(req, res) {
    const entidade = await EntidadeRepository.getAll();

    return res.json(entidade);
  }

  async delete(req, res) {
    const entidade = await EntidadeRepository.delete(req.params.id);

    return res.json(entidade);
  }
}

export default new EntidadeController();
