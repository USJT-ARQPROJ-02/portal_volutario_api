import * as Yup from 'yup';
import AppError from '../../../errors/AppError';
import VoluntarioRepository from '../../repositories/VoluntarioRepository';

class CreateVoluntarioService {
  async execute({ nome, cpf_cnpj, email, telefone, endereco }) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf_cnpj: Yup.string().required(),
      email: Yup.string().required(),
      telefone: Yup.string().required(),
      endereco: Yup.string().required(),
    });

    await schema
      .validate({ nome, cpf_cnpj, email, telefone, endereco })
      .catch(function(err) {
        console.log(err);
        throw new AppError(`${err.errors}`, 401);
      });

    const checkUserExists = await VoluntarioRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const voluntario = await VoluntarioRepository.create({
      nome,
      cpf_cnpj,
      email,
      telefone,
      endereco,
    });

    return voluntario;
  }
}

export default CreateVoluntarioService;
