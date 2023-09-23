import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import questions_file from './../questions.json';
import { Alert, Button, Form } from 'react-bootstrap';
import QuizResults from '../util/QuizResults';
import { useNavigate } from 'react-router-dom';
import { AnswerFeedback } from './AnswerFeedback';
// taken from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}


export default function QuizForm(props) {
    const params = useParams();
    const quizId = params['id'];
    const [shuffled_questions, setQuestions] = useState([]);
    useEffect(() => {
        props.onSetSearchBarVisible(false);
        setQuestions(shuffle(questions_file[quizId]["questions"]));
    }, []);
    const [answers, setAnswers] = useState({});
    const [data, setData] = useState({ passedQuestions: [], quizResults: [], isVisible: false });
    const [answeredSoFar, setAnsweredSoFar] = useState(0);
    const validate = () => {
        return answeredSoFar >= Array.from(Object.values(shuffled_questions)).length;
    };
    return (
        !data.isVisible ?
            <Form className='p-3 col-6' onSubmit={(e) => {
                e.preventDefault();
                props.onSetSearchBarVisible(true);
                setData({
                    passedQuestions: shuffled_questions,
                    quizResults: Array.from(Object.values(answers).map(ans => ans.answer)), isVisible: true
                });
            }}>
                <h2 className='mb-5 text-center'>{questions_file[quizId]["name"]}</h2>
                <h3 className='mb-5'>Questions:</h3>
                {shuffled_questions.map((q, id) =>
                    <div className='question'>
                        <p>{id + 1}. {q.question}</p>
                        {q.type === "multiple_choice" || q.type === "true_false" ?
                            Object.keys(q.answer_choices).map((a) =>
                                <div className='answerChoices'>
                                    <input type="radio" name={id} className='p-2' id={a + '_' + id} value={q.answer_choices[a]}
                                        onChange={(e) => {
                                            answers[id] = { question: a + "_" + id, answer: e.target.value };
                                            setAnswers(answers);
                                            setAnsweredSoFar(Array.from(Object.values(answers)).length);
                                        }} />
                                    <label htmlFor={a + '_' + id} className='p-2'>{q.answer_choices[a]}</label>
                                </div>)
                            :
                            <input className="form-control" name={id} id={id} placeholder='answer'
                                onChange={(e) => {
                                    answers[id] = { question: id, answer: e.target.value.toLowerCase() };
                                    setAnswers(answers);
                                    setAnsweredSoFar(Array.from(Object.values(answers)).length)
                                }} />
                        }
                    </div>)
                }
                {!validate() ? 
                <div key={answeredSoFar}>All questions must be answered before submitting.
                    <br/>Unanswered questions: <br/>
                    {[...Array(shuffled_questions.length).keys()].filter((id) => !Object.keys(answers).includes(id.toString())).map(x=>x+1).join(", ")}</div> 
                : ""}
                <Button type="submit" className='btn d-block btn-primary mt-3' disabled={!validate()}>Submit</Button>
            </Form> :
            <AnswerFeedback data={data} />
    );
}