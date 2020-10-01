import AppError from '../../../errors/AppError';
import Voluntario from '../../models/Voluntario';
import Entidade from '../../models/Entidade';
import EntidadeRepository from '../../repositories/EntidadeRepository';

class CreateEntidadeService {
  async execute(data) {
    const checkEmailIsUsed = await Entidade.findOne({
      where: { email: data.email },
    });

    const checkEmailIsUsed2 = await Voluntario.findOne({
      where: { email: data.email },
    });

    if (checkEmailIsUsed || checkEmailIsUsed2) {
      throw new AppError('Email já cadastrado na aplicação', 401);
    }

    const checkCnpj = await Entidade.findOne({ where: { cnpj: data.cnpj } });

    if (checkCnpj) {
      throw new AppError('CNPJ já cadastrado na aplicação', 401);
    }

    const entidade = await EntidadeRepository.create(data);

    return entidade;
  }
}

export default CreateEntidadeService;
