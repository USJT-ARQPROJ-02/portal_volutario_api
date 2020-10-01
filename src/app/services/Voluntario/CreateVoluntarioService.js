import * as Yup from 'yup';
import AppError from '../../../errors/AppError';
import Entidade from '../../models/Entidade';
import Voluntario from '../../models/Voluntario';
import VoluntarioRepository from '../../repositories/VoluntarioRepository';

class CreateVoluntarioService {
  async execute({ nome, cpf_cnpj, email, telefone, endereco, senha }) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf_cnpj: Yup.string().required(),
      email: Yup.string().required(),
      telefone: Yup.string().required(),
      endereco: Yup.string().required(),
      senha: Yup.string().required(),
    });

    await schema
      .validate({ nome, cpf_cnpj, email, telefone, endereco, senha })
      .catch(function(err) {
        console.log(err);
        throw new AppError(`${err.errors}`, 401);
      });

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
      senha,
    });

    return voluntario;
  }
}

export default CreateVoluntarioService;
