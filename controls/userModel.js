const users = [];

export function getUsers() {
    return users;
}

export function findUserById(id) {
    return users.find(user => user.id === id);
}

export function createUser(nome, email) {
    const newUser = {
        id: users.length ? Math.max(...users.map(user => user.id)) + 1 : 1,
        name: nome,
        email: email,
        pontuacao: 0
    };

    users.push(newUser);
    return newUser;
}