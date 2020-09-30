import AppError from '../../../errors/AppError';
import EntidadeRepository from '../../repositories/EntidadeRepository';

class UpdateEntidadeService {
  async execute(data) {
    const findEntidade = await EntidadeRepository.findById(data.id);

    const entidade = await findEntidade.update(data.updateData);

    return entidade;
  }
}

export default UpdateEntidadeService;
