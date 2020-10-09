import CandidaturaRepository from "../../repositories/CandidaturaRepository";

class CreateCanditaduraService {
  async execute(data) {

    const candidatura = await CandidaturaRepository.create(data);

    return candidatura;
  }
}

export default CreateCanditaduraService;
