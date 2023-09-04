import { useParams, Link } from "react-router-dom";
import questions_file from './../questions.json';

export default function QuizPage(){
    const params = useParams();
    const quizId = params['id'];

    const quiz = questions_file[quizId];

    return (
        <div className="card">
            <div className="card-header">{quiz['name']}</div>
            <div className="card-body">
                <h5 className="card-title">This quiz contains:</h5>
                <p className="card-text">{quiz['questions'].length} questions.</p>
                <Link to={"/quizapp/" + quizId + "/results"} className="btn btn-primary">Start</Link>
            </div>
        </div>
    );
}