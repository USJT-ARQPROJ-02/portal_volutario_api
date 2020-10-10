import AppError from '../../../errors/AppError';
import Candidatura from '../../models/Candidatura';

class CreateCanditaduraService {
  async execute(data) {
    const { voluntario_id, necessidade_id } = data;

    const checkUser = await Candidatura.findOne({
      where: {
        voluntario_id: voluntario_id,
        necessidade_id: necessidade_id,
      },
    });

    if (checkUser) {
      throw new AppError('Usuario já se candidatou a essa necessidade', 401);
    }

    const candidatura = await Candidatura.create({
      voluntario_id,
      necessidade_id,
    });

    return candidatura;
  }
}

export default CreateCanditaduraService;
