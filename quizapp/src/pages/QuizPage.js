import { useParams, Link } from "react-router-dom";
import questions_file from './../questions.json';

export default function QuizPage() {
    const params = useParams();
    const quizId = params['id'];

    const quiz = questions_file[quizId];

    return (
            <div className=" card row container-fluid mt-5 text-white mx-auto">
                <div className="card-header"> <h3>{quiz['name']}</h3>
                <div className="card-body">
                    <h5 className="card-title">This quiz contains:</h5>
                    <p className="card-text">{quiz['subject']} questions.</p>
                    {/* <p className="card-text">{quiz['questions'].length} questions.</p> */}
                    <Link to={"/"} className="btn btn-secondary me-2">Back</Link>
                    <Link to={"/" + quizId} className="btn btn-primary">Start</Link>
                </div>
                </div>
            </div>

    );
}