import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AnswerFeedback(props) {
    const [correctCount, setCorrectCount] = useState(0);
    useEffect(() => {
        setCorrectCount(props.data.passedQuestions.filter((q, id) => q.answer === props.data.quizResults[id]).length);
    }, []);

    return (
        <div className='p-3 col-6'>
            <h2 className="mb-5">Test results: {correctCount + '/' + props.data.passedQuestions.length}
                    ({Math.round(correctCount / props.data.passedQuestions.length * 100)}%)
            </h2>
            {props.data.passedQuestions.length > 0 && props.data.passedQuestions.map((q, questionId) => (
                <>
                    <div className='question card pt-3 pb-3 ps-3 pe-3' style={{ 'text-align': 'left', 'align-content': 'left', 'background-color': '#434a58' }}>
                        <h6 class="card-header">{questionId + 1}. {q.question}</h6>
                        {q.type === 'multiple_choice' || q.type === 'true_false' ?
                            Object.keys(q.answer_choices).map((a) =>
                                <div className="answerChoices">
                                    {props.data.quizResults[questionId] === q.answer_choices[a] ?
                                        <>
                                            <input type="radio" name={questionId} className='p-2' id={a + '_' + questionId} value={q.answer_choices[a]}
                                                disabled checked />
                                            <label htmlFor={a + '_' + questionId} className='p-2' style={{
                                                'fontWeight': 'bold', 'color':
                                                    q.answer_choices[a] === q.answer ? 'lawngreen' : 'orangered'
                                            }}>{q.answer_choices[a]}</label>
                                            {props.data.quizResults[questionId] === q.answer ?
                                                <></> :
                                                <span className="text-danger p-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                                    </svg>
                                                    Your Answer
                                                </span>
                                            }
                                        </>
                                        :
                                        <>
                                            <input type="radio" name={questionId} className='p-2' id={a + '_' + questionId} value={q.answer_choices[a]} disabled />
                                            <label htmlFor={a + '_' + questionId} className='p-2'>{q.answer_choices[a]}</label>
                                        </>}
                                    {q.answer_choices[a] === q.answer ?
                                        <span className="text-success p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                            </svg>
                                            Correct Answer
                                        </span> :  <></>}
                                </div>)
                            :
                            <div className="answerChoices">
                                <div className="form-outline w-50">
                                    Your answer:
                                    {props.data.quizResults[questionId] === q.answer ?
                                        <>
                                            <span className="text-success p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                                </svg>
                                            </span>
                                            <input type="text" name={questionId} className='form-control' id={questionId} value={props.data.quizResults[questionId]} disabled />
                                        </>
                                        :
                                        <>
                                            <span className="text-danger p-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                                </svg>
                                            </span>
                                            <input type="text" name={questionId} className='form-control' id={questionId} value={props.data.quizResults[questionId]} disabled />
                                            <div style={{ 'font-size': '1.1em', 'font-weight': 'bold' }}>
                                                Correct answer: {q.answer}
                                            </div>
                                            <br />
                                        </>
                                    }
                                </div>

                            </div>
                        }
                    </div>
                    <br></br>
                </>
            ))}

            <Link to='/' className="btn btn-primary mt-4">Finish</Link>
        </div>
    );
}