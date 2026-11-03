const questions = [];

export function getQuestions() {
    return questions;
}

export function findQuestionById(id) {
    return questions.find(question => question.id === id);
}

export function createQuestion(quizId, text, options, correctAnswer) {
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

export function deleteQuestionsByQuiz(quizId) {
    for (let i = questions.length - 1; i >= 0; i--) {
        if (questions[i].quizId === quizId) {
            questions.splice(i, 1);
        }
    }
}