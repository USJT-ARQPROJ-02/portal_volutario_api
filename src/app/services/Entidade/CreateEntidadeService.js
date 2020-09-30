import AppError from '../../../errors/AppError';
import EntidadeRepository from '../../repositories/EntidadeRepository';

class CreateEntidadeService {
  async execute(data) {
    const checkUserExists = await EntidadeRepository.findByEmail(data.email);

    if (checkUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const entidade = await EntidadeRepository.create(data);

    return entidade;
  }
}

export default CreateEntidadeService;
