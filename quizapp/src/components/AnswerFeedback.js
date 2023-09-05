import { useEffect } from "react";

export function AnswerFeedback(props) {
    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <>
            {props.data.passedQuestions.length > 0 && props.data.passedQuestions.map((q, questionId) => {
                <div className='question'>
                    <p>{questionId + 1}. {q.question}</p>
                    {Object.keys(q.answer_choices).map((a) =>
                                //props.data.quizResults.indexOf(a + '_' + questionId) !== -1 ?
                                <>
                                    <input type="radio" name={questionId} className='p-2' id={a + '_' + questionId} value={q.answer_choices[a]}/>
                                    <label htmlFor={a + '_' + questionId} className='p-2'>{q.answer_choices[a]}</label>
                                </> 
                                /*: 
                                <>
                                    <input type="radio" name={questionId} className='p-2' id={a + '_' + questionId} value={q.answer_choices[a]} disabled/>
                                    <label htmlFor={a + '_' + questionId} className='p-2'>{q.answer_choices[a]}</label>
                                </>*/)}
                </div>
            })}
        </>
    );
}