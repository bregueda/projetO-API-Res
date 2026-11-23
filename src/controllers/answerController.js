import * as answersService from '../services/answers.service.js';

export function listar(req, res) {
    res.json(answers.service.listarAnswers());
}

export function criar(req, res) {
    try {
        const quiz = answers.service.criarAnswer(req.body);
        res.status(201).json(answer);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

export function editar(req, res) {
    try {
        const answer = answers.service.editarAnswer(req.params.id, req.body);
        res.json(answer);
        res.status(204).json({ message: 'Answer editada com sucesso' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}


export function deletar(req, res) {
    try {
        const answer = answers.service.deletarAnswer(req.params.id);
        res.json(answer);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}
