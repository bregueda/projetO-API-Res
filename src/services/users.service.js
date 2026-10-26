const users = []
let proximoId = 1;

export function listar(){
    return users
};

export function criar({nome, email, pontuacao}){
    if (typeof nome !== 'string' || !nome ) {
        throw new Error('Nome é obrigatório');
    }

    const newUser = {id: proximoId++, nome: nome.trim(), email: email.trim(), pontuacao: pontuacao.trim()}
    users.push(newUser);

    return newUser;
};

export function editar(nome, email) {
     if (typeof nome !== 'string' || !nome ) {
        throw new Error('Nome é obrigatório');
    }




};

export function deletar() {

};