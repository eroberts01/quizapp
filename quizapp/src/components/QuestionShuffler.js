import React from 'react';
import questions_file from './../questions.json';
import { AnswerFeedback } from './AnswerFeedback';

// taken from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export function QuestionShuffler() {
    let shuffled_questions = shuffle(questions_file["Test quiz"]["questions"]);
    return (
        <div>
            {shuffled_questions.map((q) => <AnswerFeedback question={q} answer="A"/>)}
        </div>
    );
}