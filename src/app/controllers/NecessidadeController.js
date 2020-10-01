import CreateNecessidadeService from '../services/Necessidade/CreateNecessidadeService';
import UpdateNecessidadeService from '../services/Necessidade/UpdateNecessidadeService';
import NecessidadeRepository from '../repositories/NecessidadeRepository';

class NecessidadeController {
  async create(req, res) {
    const necessidadeService = new CreateNecessidadeService();
    const data = req.body;
    Object.assign(data, {
      entidade_id: req.entidadeId,
    });
    const createNecessidade = await necessidadeService.execute(data);

    return res.json(createNecessidade);
  }

  async update(req, res) {
    const necessidadeService = new UpdateNecessidadeService();

    const data = { id: req.params.id, updateData: req.body };
    const updateNecessidade = await necessidadeService.execute(data);

    return res.json(updateNecessidade);
  }

  async get(req, res) {
    const necessidade = await NecessidadeRepository.getAll();

    return res.json(necessidade);
  }

  async delete(req, res) {
    const necessidade = await NecessidadeRepository.delete(req.params.id);

    return res.json(necessidade);
  }
}

export default new NecessidadeController();
