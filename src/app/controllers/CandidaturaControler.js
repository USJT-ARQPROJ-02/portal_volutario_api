import CreateCanditaduraService from '../services/Necessidade/CreateCanditaduraService';
import UpdateCandidaturaService from '../services/Necessidade/UpdateCandidaturaService';
import UpdateCandidaturaService from '../services/Necessidade/UpdateCandidaturaService';
import CandidaturaRepository from '../repositories/CandidaturaRepository';

class CandidaturaControler {
    async create(req, res) {
        const candidaturaService = new CreateCanditaduraService();
        const data = req.body;
        Object.assign(data, {
            entidade_id: req.entidadeId,
        });
        const createNecessidade = await necessidadeService.execute(data);

        return res.json(createNecessidade);
    }

    async update(req, res) {
        const candidaturaService = new UpdateCandidaturaService();

        const data = { id: req.params.id, updateData: req.body };
        const updateNecessidade = await necessidadeService.execute(data);

        return res.json(updateNecessidade);
    }

    async get(req, res) {
        const candidatura = await CandidaturaRepository.getAllByNecessidade(req.params.necessidade);

        return res.json(candidatura);
    }

    async delete(req, res) {
        const necessidade = await NecessidadeRepository.delete(req.params.id);

        return res.json(necessidade);
    }

}

export default new CandidaturaControler();