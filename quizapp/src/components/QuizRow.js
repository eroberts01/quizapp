import { Link } from "react-router-dom";
import questions_file from './../questions.json';
import { useEffect, useState } from "react";

export default function QuizRow({searchVal}){
    const [questions, setQuestions] = useState(Object.entries(questions_file));
    useEffect(() => {
        if(searchVal) 
            setQuestions(Object.entries(questions_file).filter(([id, quiz]) => quiz.name.includes(searchVal)));
    }, [searchVal]);

    return (
        <div className="row container-fluid mt-5">
            {questions.map(([id, quiz]) => (
                <div className="col-md-4">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{quiz.name}</h5>
                        <div>{quiz.questions.length} questions</div>
                        <Link to={`/quizapp/${id}/start`} className="btn btn-primary">
                            Start
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </Link>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    );
}