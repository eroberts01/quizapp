import React from 'react';
import { Link, useParams } from 'react-router-dom';
import questions_file from './../questions.json';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

            <Form>
                <h3>Questions:</h3>
                {shuffled_questions.map((q) =>
                    <div className='question'>
                        <p>{q.question}</p>
                            {Object.keys(q.answer_choices).map((a) =>
                                <div className='answerChoices'>
                                    <input type="radio" name="answerRadioButton" id="answer" />
                                    <label for="answer">
                                        {q.answer_choices[a]}
                                    </label>
                                </div>)}
                    </div>
                )
                }
                <>
                    <Button variant="submit">Submit</Button>
                </>
            </Form >

        </div >
    );
}