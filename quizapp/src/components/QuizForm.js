import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import questions_file from './../questions.json';
import { Button, Form } from 'react-bootstrap';
import QuizResults from '../util/QuizResults';
import { useNavigate } from 'react-router-dom';
import { AnswerFeedback } from './AnswerFeedback';
// taken from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export default function QuizForm() {
    const params = useParams();
    const quizId = params['id'];
    const [shuffled_questions, setQuestions] = useState([]);
    useEffect(() => {
        setQuestions(shuffle(questions_file[quizId]["questions"]));
    }, []);
    const [answers, setAnswers] = useState([]);
    const [data, setData] = useState({passedQuestions: [], quizResults: [], isVisible: false});
    return (
        !data.isVisible ? 
            <Form className='p-3 col-6' onSubmit={(e) => {
                e.preventDefault();
                setData({passedQuestions: shuffled_questions,
                    quizResults: Array.from(answers.map(ans => ans.question)), isVisible: true});
            }}>
                <h3 className='mb-5'>Questions:</h3>
                {shuffled_questions.map((q, id) =>
                    <div className='question'>
                        <p>{id + 1}. {q.question}</p>
                            {Object.keys(q.answer_choices).map((a) =>
                                <div className='answerChoices'>
                                    <input type="radio" name={id} className='p-2' id={a + '_' + id} value={q.answer_choices[a]} 
                                    onChange={(e) => {
                                        let answerId = answers.findIndex((ans) => ans.question == id);
                                        if(answerId === -1){
                                            answers.push({question: a + "_" + id, answer: e.target.value});
                                        }
                                        else {
                                            answers[answerId] = {question: a + "_" + id, answer: e.target.value};
                                        }
                                        setAnswers(answers);
                                    }}/>
                                    <label htmlFor={a + '_' + id} className='p-2'>{q.answer_choices[a]}</label>
                                </div>)
                            }
                    </div>)
                }
                <Button type="submit" className='btn d-block btn-primary mt-3'>Submit</Button>
            </Form> : 
            <AnswerFeedback data={data}/>
    );
}