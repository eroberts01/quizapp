import React from 'react';

export function AnswerFeedback(props) {
    let question = props.question;
    let answer = props.answer;

    return (
        <div>
            <div>{question.question}</div>
            <div>Selected answer: {answer}</div>
            <div>Correct answer: {question.answer}</div>
            <div>Result: {answer === question.answer ? "Correct" : "Incorrect"}</div>
            {Object.keys(question.answer_choices).map((a) => <div>{a}. {question.answer_choices[a]}</div>)}
        </div>
    );
}