import React from 'react';
import questions_file from './../questions.json';
import Button from 'react-bootstrap/Button';
// import form from 'react-bootstrap/Form';

// taken from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}
const count = 0;

export function QuestionShuffler() {
    let shuffled_questions = shuffle(questions_file["Test quiz"]["questions"]);
    return (
        <div className='questionsMain'>
            <form className='col-5 bg-light p-3'>
                <h3 className="text-dark text-center">Questions:</h3>
                {shuffled_questions.map((q) =>
                    <div className='questionsList'>
                        <p className="text-center fw-bold">{q.question}</p>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="answerRadioButton" id="answerA" />
                            <label className="form-check-label" for="answerA">
                                {q.answerChoices}
                            </label>
                        </div>
                    </div>
                )}
                <>
                <Button variant="submit">Submit</Button>
                </>
            </form>

        </div>
    );
}


 // <div>
        //     {shuffled_questions.map((q) =>
        //         <div>
        //             {q.question}
        //         </div>)}
        // </div>