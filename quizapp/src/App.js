import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import {QuestionShuffler} from './components/QuestionShuffler';
import { Navbar } from './components/Navbar';
import QuizRow from './components/QuizRow';
import QuizPage from "./pages/QuizPage";
import QuizForm from "./components/QuizForm";
import { AnswerFeedback } from "./components/AnswerFeedback";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
      <>
        <Navbar/>
      <Routes>
        <Route path="/quizapp/:id/start" element={<QuizPage/>}/>
        <Route path="/quizapp/:id" element={<QuizForm/>}/>
        <Route path="/quizapp/shuffle" element={<QuestionShuffler/>}/>
        <Route path="/quizapp" element={<QuizRow/>}/>
        <Route path="/" element={<Navigate replace to="/quizapp"/>}/>
      </Routes>
      </>
  );
}

export default App;
