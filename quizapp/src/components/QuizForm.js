import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import questions_file from './../questions.json';
import { Button, Form, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AnswerFeedback } from './AnswerFeedback';

// taken from https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}


export default function QuizForm(props) {
    const width = window.innerWidth / 3;
    const navigate = useNavigate();
    const params = useParams();
    const quizId = params['id'];
    let [enableSpeech, setEnableSpeech] = useState(false);

    const [shuffled_questions, setQuestions] = useState([]);
    const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }
    const [leavingQuiz, setLeavingQuiz] = useState(false);
    useEffect(() => {
        props.onSetSearchBarVisible(false);
        setQuestions(shuffle(questions_file[quizId]["questions"]));
        document.title = questions_file[quizId]["name"];
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            const synth = window.speechSynthesis;
            synth.cancel();
        }
    }, []);

    // New state for selected question
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [answers, setAnswers] = useState({});
    const [data, setData] = useState({ passedQuestions: [], quizResults: [], isVisible: false, onSetSearchBarVisible: false });
    const [answeredSoFar, setAnsweredSoFar] = useState(0);

    const validate = () => {
        return answeredSoFar >= Array.from(Object.values(shuffled_questions)).length;
    };

    return (
        !data.isVisible ?
            <Form className='p-3 col-6' onSubmit={(e) => {
                e.preventDefault();
                const answer = window.confirm("Are you sure you would like to submit the quiz?");
                if (!answer) {
                    return;
                }
                props.onSetSearchBarVisible(false);
                setData({
                    passedQuestions: shuffled_questions,
                    quizResults: Array.from(Object.values(answers).map(ans => ans.answer)), isVisible: true
                });
            }}>
                <h5><Form.Check type="switch" id="custom-switch" label={<span title="Click on each question to speak it aloud.">Speak Question</span>}
                    checked={enableSpeech}
                    onChange={() => {
                        {
                            setEnableSpeech(!enableSpeech)
                        }
                    }}
                    size="lg" style={{ 'position': 'absolute', 'top': 100, 'right': width }} /></h5>
                {!validate() ?
                    <h5 key={answeredSoFar} className='alert alert-info text-wrap w-25 text-center' style={{ 'position': 'fixed', 'bottom': 10, 'right': 0 }}>
                        <h6>QUESTIONS LEFT:</h6>
                        {[...Array(shuffled_questions.length).keys()].filter((id) => !Object.keys(answers).includes(id.toString())).map(x => x + 1).join(", ")}
                    </h5>
                    : ""}

                <Breadcrumb>
                    <Breadcrumb.Item href='/quizapp'>Home</Breadcrumb.Item>
                    <Breadcrumb.Item href={"/quizapp#/" + quizId + "/start"}>
                        {questions_file[quizId]["name"]} start
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{questions_file[quizId]["name"]}</Breadcrumb.Item>
                </Breadcrumb>
                <button className='btn btn-primary btn-lg' onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>Go back</button>
                <h2 className='mb-5 text-center'>{questions_file[quizId]["name"]}</h2>
                <h3 className='mb-5'>Questions:</h3>
                {shuffled_questions.map((q, id) => (
                    <>
                        <div key={id} className={`question card pt-3 pb-3 ps-3 pe-3 ${selectedQuestion === id ? 'selected-question' : ''}`} style={{
                            'text-align': 'left', 'align-content': 'left',
                            'background-color': answers.hasOwnProperty(id) ? '#3c5fa6' : '#434a58'
                        }} onClick={() => {
                            setSelectedQuestion(id);
                            if (enableSpeech) {
                                if (q.type === "multiple_choice" || q.type === "true_false") {
                                    speak(`Question ${id + 1}: ${q.question}`);
                                    Object.keys(q.answer_choices).forEach((a) => {
                                        speak(`Choice ${a}: ${q.answer_choices[a]}`);
                                    });
                                } else {
                                    speak(`Question ${id + 1}: Blank ${q.question.slice(6, q.question.length)}`);
                                    speak(`Please type your answer in the box.`)
                                }
                            }
                        }}
                        >
                            <div className="question-header">
                                <h6 className="card-header">{id + 1}. {q.question}  </h6>
                                {enableSpeech ?
                                    <div title='Click to read out loud'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fdf274" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                    </div>
                                    :
                                    <></>
                                }

                                <h5 className="answered">{answers.hasOwnProperty(id) ? "✔ Answered" : ""}</h5>
                            </div>

                            {q.type === "multiple_choice" || q.type === "true_false" ?
                                Object.keys(q.answer_choices).map((a) => (
                                    <div className='answerChoices'>
                                        <input type="radio" name={id} className='p-2' id={a + '_' + id} value={q.answer_choices[a]} onChange={(e) => {
                                            answers[id] = { question: a + "_" + id, answer: e.target.value };
                                            setAnswers(answers);
                                            setAnsweredSoFar(Array.from(Object.values(answers)).length);
                                        }}
                                        />
                                        <label htmlFor={a + '_' + id} className='p-2'>{q.answer_choices[a]}</label>
                                    </div>
                                ))
                                :
                                <input className="form-control" type="text" name={id} id={id} placeholder='answer' onChange={(e) => {
                                    if (e.target.value) {
                                        answers[id] = { question: id, answer: e.target.value.toLowerCase() };
                                    }
                                    else if (id in answers) {
                                        delete answers[id];
                                    }
                                    setAnswers(answers);
                                    setAnsweredSoFar(Array.from(Object.values(answers)).length)
                                }}
                                />
                            }
                        </div>
                        <br></br>
                    </>

                ))}
                <div className="d-flex justify-content-between">
                    <Button type="submit" className='btn d-block btn-primary mt-3' disabled={!validate()}>Submit</Button>
                    <Button variant="danger" className='btn d-block btn-secondary mt-3' onClick={() => {
                        const answer = window.confirm("Are you sure you would like to reset the quiz? This will erase your answers");
                        if (!answer) {
                            return;
                        }
                        setAnswers({});
                        setAnsweredSoFar(0);
                        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
                            radio.checked = false;
                        });
                        document.querySelectorAll('input[type="text"]').forEach((input) => {
                            input.value = '';
                        });
                    }}
                    >
                        Reset
                    </Button>
                </div>
            </Form> :
            <AnswerFeedback data={data} />
    );
}
