import express from "express"; 
 
const app = express(); 
app.use(express.json()); 
 
const PORT = 3000; 
 
const quizzes = [ 
    {id: 1, title: "", description: "", questions: []}, 
    {id: 2, title: "", description: "", questions: []}, 
    {id: 3, title: "", description: "", questions: []}, 
]; 
 
const questions = [ 
    {id: 1, quizId: 1, text: "", options: [], correctAnswer: ""}, 
    {id: 2, quizId: 1, text: "", options: [], correctAnswer: ""}, 
    {id: 3, quizId: 2, text: "", options: [], correctAnswer: ""}, 
]; 
 
const answers = [ 
    {id: 1, questionId: 1, userId: 1, answer: ""}, 
    {id: 2, questionId: 2, userId: 2, answer: ""}, 
    {id: 3, questionId: 3, userId: 3, answer: ""}, 
]; 
  
const users = [ 
    {id: 1, name: "", email: ""}, 
    {id: 2, name: "", email: ""}, 
    {id: 3, name: "", email: ""}, 
]; 

function cadastrarUsuario(nome, email) {
    const novoUsuario = {
        id: users.length + 1,
        name: nome,
        email: email
    };

    users.push(novoUsuario);

    return novoUsuario;
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

app.post("/quizzes", (req, res) => {
    const { title, description } = req.body;
    const novoQuiz = {
        id: quizzes.length + 1,
        title,
        description,
        questions: [cadastrarQuestion(quizzes.length + 1, "Pergunta 1", ["Opção A", "Opção B", "Opção C"], "Opção A")]
    };
    quizzes.push(novoQuiz);
    res.status(201).json(novoQuiz);
});

app.delete("/quizzes/:id", (req, res) => {
    const quizId = parseInt(req.params.id);
    const index = quizzes.findIndex(quiz => quiz.id === quizId);
    if (index !== -1) {
        quizzes.splice(index, 1);
        res.status(200).json({ message: "Quiz deleted successfully" });
    } else {
        res.status(404).json({ message: "Quiz not found" });
    }
});

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});