const answers = [];

export function getAnswers() {
    return answers;
}

export function createAnswer(questionId, userId, answer) {
    const newAnswer = {
        id: answers.length + 1,
        questionId: questionId,
        userId: userId,
        answer: answer
    };

    answers.push(newAnswer);

    return newAnswer;
}

export function deleteAnswersByQuestion(questionId) {
    for (let i = answers.length - 1; i >= 0; i--) {
        if (answers[i].questionId === questionId) {
            answers.splice(i, 1);
        }
    }
}