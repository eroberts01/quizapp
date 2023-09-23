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
                    <p className="card-text">{quiz['questions'].length} questions.</p>
                    <Link to={"/"} className="btn btn-secondary me-2">Back</Link>
                    <Link to={"/" + quizId} className="btn btn-primary">Start</Link>
                    <br/><br/>
                    <div>Quiz instructions:</div>
                    <div>For multiple choice questions, click the radio icon next to an answer choice to select that answer choice.</div>
                    <div>For fill-in-the-blank questions, type your answer in the "answer" input box.</div>
                    <div>Once all questions have been answered, you will be able to submit your quiz using the Submit button at the bottom of the quiz page.</div>
                </div>
                </div>
            </div>

    );
}