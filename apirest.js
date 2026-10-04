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



 
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`); 
});