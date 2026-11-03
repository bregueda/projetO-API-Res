
import * as userService from '../services/userService.js';

export function listar(req, res) {
    res.json(userService.listarUsuarios());
}

export function criar(req, res) {
    try {
        const usuario = userService.criarUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

export function editar(req, res) {
    try {
        const usuario = userService.editarUsuario(req.params.id, req.body);
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}

export function deletar(req, res) {
    try {
        const usuario = userService.deletarUsuario(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
}
