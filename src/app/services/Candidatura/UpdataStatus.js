import CandidaturaRepository from "../../repositories/CandidaturaRepository";

class UpdateCandidaturaService {
  async execute(data) {
    const findCandidatura = await CandidaturaRepository.findById(data.id);

    const candidatura = await findCandidatura.update(data.updateData);

    return candidatura;
  }
}

export default UpdateCandidaturaService;
