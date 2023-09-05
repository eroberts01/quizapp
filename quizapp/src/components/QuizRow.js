import { Link } from "react-router-dom";
export default function QuizRow(){
    return (
        <div className="row container-fluid mt-5">
            <div className="col-md-4">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Quiz 1</h5>
                    <Link to='/quizapp/1/start' className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </Link>
                </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Quiz 2</h5>
                    <Link to='/quizapp/2/start' className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}