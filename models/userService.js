import * as User from "../models/userModel.js";

export function cadastrarUsers(nome, email) {
    const newUser = User.createUser(nome, email);

    return newUser;
}

export function listarUsers() {
    return User.getUsers();
}