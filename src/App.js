import './App.css';
import axios from "axios";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Result/Result';
import Review from './Pages/Review/Review'; // ✅ Import Review page

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // ✅ NEW STATE

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
    setUserAnswers([]); // ✅ Reset user answers on new quiz
  };

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: "url(./solid-light-blue-background.jpg)" }}>
        <Header />

        <Routes>
          <Route 
            path="/" 
            element={<Home 
              name={name} 
              setName={setName}
              fetchQuestions={fetchQuestions} 
            />} 
          />

          <Route 
            path="/quiz" 
            element={<Quiz 
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              userAnswers={userAnswers} // ✅ pass to Quiz
              setUserAnswers={setUserAnswers} // ✅ pass to Quiz
            />} 
          />

          <Route 
            path="/result" 
            element={<Result 
              name={name} 
              score={score} 
              userAnswers={userAnswers} // ✅ pass to Result
            />} 
          />

          <Route 
            path="/review" 
            element={<Review userAnswers={userAnswers} />} // ✅ new route
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
