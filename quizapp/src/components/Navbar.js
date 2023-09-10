import { Link } from 'react-router-dom'; 
import { useRef } from 'react';
export function Navbar(props){
    const searchRef = useRef();

    return <nav className="navbar navbar-dark bg-dark text-light pb-3 pt-3">
            <div className="container-fluid">
                <Link className="nav-link navbar-brand" aria-current="page" to="/" reloadDocument><h3>SWE 632 Quiz App</h3></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/" reloadDocument>Browse quizzes</Link>
                    </li>
                </ul>
                <form className="d-flex" onSubmit={(e) => {
                    e.preventDefault();
                    props.onFilterQuizzes(searchRef.current.value);
                }}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={searchRef}/>
                    <button className="btn btn-primary" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg></button>
                </form>
                </div>
            </div>
    </nav>;
}