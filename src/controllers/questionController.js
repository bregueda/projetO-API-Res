import * as questionService from '../services/questions.service.js';

export function listar(req, res) {
    res.json(questions.service.listarQuestions());
}

export function criar(req, res) {
    try {
        const quiz = questions.service.criarQuestion(req.body);
        res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

export function editar(req, res) {
    try {
        const question = userService.editarquestion(req.params.id, req.body);
        res.json(question);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}


export function deletar(req, res) {
    try {
        const question = questions.service.deletarquestion(req.params.id);
        res.json(question);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}
