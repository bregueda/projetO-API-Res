import express from 'express';
import answersRoutes from './routes/answerRoutes.js';
import questionsRoutes from './routes/questionRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use('/answers', answersRoutes);
app.use('/questions', questionsRoutes);
app.use('/quiz', quizRoutes);
app.use('/user', userRoutes);

export default app;