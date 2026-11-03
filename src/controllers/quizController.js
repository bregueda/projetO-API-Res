
import * as quizService from '../services/quizService.js';

export function listar(req, res) {
    res.json(quizService.listarQuizzes());
}

export function criar(req, res) {
    try {
        const quiz = quizService.criarQuiz(req.body);
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

export function deletar(req, res) {
    try {
        const quiz = quizService.deletarQuiz(req.params.id);
        res.json(quiz);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}
