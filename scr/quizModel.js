const quizzes = [];

export function getQuizzes() {
    return quizzes;
}

export function findQuizById(id) {
    return quizzes.find(quiz => quiz.id === id);
}

export function createQuiz(title, description) {
    const newQuiz = {
        id: quizzes.length + 1,
        title: title,
        description: description,
        questions: []
    };

    quizzes.push(newQuiz);

    return newQuiz;
}

export function deleteQuiz(id) {
    const index = quizzes.findIndex(quiz => quiz.id === id);

    if (index === -1) {
        return false;
    }

    quizzes.splice(index, 1);

    return true;
}