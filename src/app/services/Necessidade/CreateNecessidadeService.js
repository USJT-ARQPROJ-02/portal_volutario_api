import AppError from '../../../errors/AppError';
import Entidade from '../../models/Entidade';
import NecessidadeRepository from '../../repositories/NecessidadeRepository';

class CreateNecessidadeService {
  async execute(data) {
    const findEntidade = await Entidade.findByPk(data.entidade_id);

    if (!findEntidade) {
      throw new AppError('Erro ao criar necessidade', 401);
    }

    if (!findEntidade.tipo_voluntariado.includes(data.tipo_voluntariado)) {
      throw new AppError('Tipo de voluntariado não aceito pela entidade', 401);
    }

    const entidade = await NecessidadeRepository.create(data);

    return entidade;
  }
}

export default CreateNecessidadeService;
