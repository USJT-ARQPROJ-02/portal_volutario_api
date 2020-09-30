import AppError from '../../../errors/AppError';
import VoluntarioRepository from '../../repositories/VoluntarioRepository';

class CreateVoluntarioService {
  async execute(data) {
    const checkUserExists = await VoluntarioRepository.findByEmail(data.email);

    if (checkUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const voluntario = await VoluntarioRepository.create(data);

    return voluntario;
  }
}

export default CreateVoluntarioService;
