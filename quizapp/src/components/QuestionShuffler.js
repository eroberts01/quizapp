import React from 'react';
import { Link, useParams } from 'react-router-dom';
import questions_file from './../questions.json';
import { AnswerFeedback } from './AnswerFeedback';

// taken from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export function QuestionShuffler() {
    const params = useParams();
    const quizId = params['id'];
    let shuffled_questions = shuffle(questions_file[quizId]["questions"]);

    return (
        <div>
            {shuffled_questions.map((q) => <AnswerFeedback question={q} answer="A"/>)}
        </div>
    );
}