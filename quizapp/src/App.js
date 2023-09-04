import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import {QuestionShuffler} from './components/QuestionShuffler';
import { Navbar } from './components/Navbar';
import QuizRow from './components/QuizRow';
import QuizPage from "./pages/QuizPage";

function App() {
  return (
      <>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/quizapp"/>}/>
        <Route path="/quizapp" element={<QuizRow/>}/>
        <Route path="/quizapp/shuffle" element={<QuestionShuffler/>}/>
        <Route path="/quizapp/:id" element={<QuizPage/>}/>
        <Route path="/quizapp/:id/results" element={<QuestionShuffler/>}/>
      </Routes>
      </>
  );
}

export default App;
