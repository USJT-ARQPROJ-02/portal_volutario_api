import * as Yup from 'yup';
import AppError from '../../../errors/AppError';
import Entidade from '../../models/Entidade';
import Voluntario from '../../models/Voluntario';
import VoluntarioRepository from '../../repositories/VoluntarioRepository';

class CreateVoluntarioService {
  async execute({
    nome,
    cpf_cnpj,
    email,
    telefone,
    endereco,
    cep,
    longitude,
    latitude,
    tipo_voluntariado,
    senha,
  }) {
    const checkEmail = await Voluntario.findOne({
      where: { email: email },
    });
    const checkEmail2 = await Entidade.findOne({
      where: { email: email },
    });

    if (checkEmail || checkEmail2) {
      throw new AppError('Email já cadastrado na aplicação', 401);
    }

    const checkCpf = await Voluntario.findOne({
      where: { cpf_cnpj: cpf_cnpj },
    });

    if (checkCpf) {
      throw new AppError('CPF/CNPJ já cadastrado na aplicação', 401);
    }

    const voluntario = await VoluntarioRepository.create({
      nome,
      cpf_cnpj,
      email,
      telefone,
      endereco,
      cep,
      longitude,
      latitude,
      tipo_voluntariado,
      senha,
    });

    return voluntario;
  }
}

export default CreateVoluntarioService;
