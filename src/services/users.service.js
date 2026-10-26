const users = []
let proximoId = 1;

export function listar(){
    return users
}

export function criar({name, email, pontuacao}){
    if (typeof name !== 'string' || !name ) {
        throw new Error('Nome é obrigatório');
    }

    const newUser = {id: proximoId++, nome: nome.trim(), email: email.trim(), pontuacao: pontuacao.trim()}
    users.push(newUser);

    return newUser;
};

export function editar() {

}

export function deletar() {

}