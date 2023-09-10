import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';

import {QuestionShuffler} from './components/QuestionShuffler';
import { Navbar } from './components/Navbar';
import QuizRow from './components/QuizRow';
import QuizPage from "./pages/QuizPage";
import QuizForm from "./components/QuizForm";
import { AnswerFeedback } from "./components/AnswerFeedback";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
function App() {
  const [quizVal, setQuizVal] = useState('');
  const onFilterQuizzes = (searchVal) => {
      setQuizVal(searchVal);
  }
  return (
      < div className="App">
        <Navbar onFilterQuizzes={onFilterQuizzes}/>
      <Routes>
        <Route path="/:id/start" element={<QuizPage/>}/>
        <Route path="/:id" element={<QuizForm/>}/>
        <Route path="/shuffle" element={<QuestionShuffler/>}/>
        <Route path="" element={<QuizRow searchVal={quizVal}/>}/>
      </Routes>
      </div>
  );
}

export default App;
