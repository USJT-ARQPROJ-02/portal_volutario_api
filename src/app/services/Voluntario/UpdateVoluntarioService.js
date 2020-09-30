import AppError from '../../../errors/AppError';
import VoluntarioRepository from '../../repositories/VoluntarioRepository';

class UpdateVoluntarioService {
  async execute(data) {
    const findVoluntario = await VoluntarioRepository.findById(data.id);

    const voluntario = await findVoluntario.update(data.updateData);

    return voluntario;
  }
}

export default UpdateVoluntarioService;
