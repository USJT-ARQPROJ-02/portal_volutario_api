import Necessidade from '../../models/Necessidade';
import NecessidadeRepository from '../../repositories/NecessidadeRepository';

class UpdateNecessidadeService {
  async execute(data) {
    const findNecessidade = await NecessidadeRepository.findById(data.id);

    const necessidade = await findNecessidade.update(data.updateData);

    return necessidade;
  }
}

export default UpdateNecessidadeService;
