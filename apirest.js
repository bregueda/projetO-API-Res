import express from "express";
import readline from "readline";

const app = express();
app.use(express.json());

const PORT = 3000;

const quizzes = [
    { id: 1, title: "", description: "", questions: [] },
    { id: 2, title: "", description: "", questions: [] },
    { id: 3, title: "", description: "", questions: [] },
];

const questions = [
    { id: 1, quizId: 1, text: "", options: [], correctAnswer: "" },
    { id: 2, quizId: 1, text: "", options: [], correctAnswer: "" },
    { id: 3, quizId: 2, text: "", options: [], correctAnswer: "" },
];

const answers = [
    { id: 1, questionId: 1, userId: 1, answer: "" },
    { id: 2, questionId: 2, userId: 2, answer: "" },
    { id: 3, questionId: 3, userId: 3, answer: "" },
];

const users = [
    { id: 1, name: "", email: "" },
    { id: 2, name: "", email: "" },
    { id: 3, name: "", email: "" },
];



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});




function cadastrarUsers(nome, email) {
    const newUser = {
        id: users.length + 1,
        name: nome,
        email: email
    };

    users.push(newUser);

    return newUser;
}




function cadastrarQuestion(quizId, text, options, correctAnswer) {
    const newQuestion = {
        id: questions.length + 1,
        quizId: quizId,
        text: text,
        options: options,
        correctAnswer: correctAnswer
    };

    questions.push(newQuestion);

    return newQuestion;
}




function cadastrarUsuarioMenu() {

    rl.question("Digite o nome: ", (nome) => {

        rl.question("Digite o email: ", (email) => {

            const novoUsuario = cadastrarUsers(nome, email);

            console.log("\n✅ Usuário cadastrado com sucesso!");
            console.table(novoUsuario);

            menu();
        });

    });

}




function cadastrarPerguntaMenu() {

    rl.question("Digite o ID do quiz: ", (quizId) => {

        rl.question("Digite a pergunta: ", (text) => {

            rl.question("Digite a alternativa A: ", (a) => {

                rl.question("Digite a alternativa B: ", (b) => {

                    rl.question("Digite a alternativa C: ", (c) => {

                        rl.question("Digite a resposta correta: ", (correctAnswer) => {

                            const novaPergunta = cadastrarQuestion(
                                Number(quizId),
                                text,
                                [a, b, c],
                                correctAnswer
                            );

                            console.log("\n Pergunta cadastrada!");
                            console.table(novaPergunta);

                            menu();

                        });

                    });

                });

            });

        });

    });

}



function deletarQuizMenu() {

    rl.question("Digite o ID do quiz que deseja deletar: ", (id) => {

        const quizId = Number(id);

        const index = quizzes.findIndex(
            quiz => quiz.id === quizId
        );

        if (index !== -1) {

            const quizRemovido = quizzes.splice(index, 1);

            console.log("\n Quiz deletado com sucesso!");
            console.table(quizRemovido);

        } else {

            console.log("\n Quiz não encontrado!");

        }

        menu();
    });
}




function menu() {

    console.log("\n==============================");
    console.log("       MENU DO SISTEMA");
    console.log("==============================");
    console.log("1 - Cadastrar usuário");
    console.log("2 - Listar usuários");
    console.log("3 - Cadastrar pergunta");
    console.log("4 - Listar quizzes");
    console.log("5 - Deletar quiz");
    console.log("6 - Sair");
    console.log("==============================");

    rl.question("Escolha uma opção: ", (opcao) => {

        switch (opcao) {

            case "1":
                cadastrarUsuarioMenu();
                break;

            case "2":

                console.log("\n👤 Usuários cadastrados:");

                console.table(users);

                menu();

                break;

            case "3":

                cadastrarPerguntaMenu();

                break;

            case "4":

                console.log("\nQuizzes cadastrados:");

                console.table(quizzes);

                menu();

                break;

            case "5":

                deletarQuizMenu();

                break;

            case "6":

                console.log("\nEncerrando sistema...");

                rl.close();

                break;

            default:

                console.log("\n Opção inválida!");

                menu();
        }

    });
}




function validarUser(req, res, next) {

    const { nome } = req.body;

    if (!nome) {

        return res.status(400).json({
            mensagem: "O nome é obrigatório!"
        });

    }

    next();
}




app.post("/usuarios", validarUser, (req, res) => {

    const { nome, email } = req.body;

    const user = cadastrarUsers(nome, email);

    res.status(201).json(user);

});




app.post("/quizzes", (req, res) => {

    const { title, description } = req.body;

    const novoQuiz = {

        id: quizzes.length + 1,

        title,

        description,

        questions: [
            cadastrarQuestion(
                quizzes.length + 1,
                "Pergunta 1",
                ["Opção A", "Opção B", "Opção C"],
                "Opção A"
            )
        ]

    };

    quizzes.push(novoQuiz);

    res.status(201).json(novoQuiz);

});



app.delete("/quizzes/:id", (req, res) => {

    const quizId = parseInt(req.params.id);

    const index = quizzes.findIndex(
        quiz => quiz.id === quizId
    );

    if (index !== -1) {

        quizzes.splice(index, 1);

        res.status(200).json({
            message: "Quiz deleted successfully"
        });

    } else {

        res.status(404).json({
            message: "Quiz not found"
        });

    }

});




app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

    menu();

});