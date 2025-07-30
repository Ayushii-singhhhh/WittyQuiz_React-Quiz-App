import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Question from "../../components/Question/Question";

const Quiz = ({
  name,
  score,
  questions,
  setQuestions,
  setScore,
  userAnswers,
  setUserAnswers
}) => {
  const [options, setOptions] = useState([]);
  const [currQues, setCurrQues] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Only shuffle if question and answers are available
    if (
      questions &&
      questions.length > 0 &&
      questions[currQues] &&
      questions[currQues].correct_answer &&
      questions[currQues].incorrect_answers
    ) {
      const allOptions = [
        questions[currQues].correct_answer,
        ...questions[currQues].incorrect_answers,
      ];
      setOptions(handleShuffle(allOptions));
    }
  }, [questions, currQues]);

  const handleShuffle = (optionsList) => {
    return [...optionsList].sort(() => Math.random() - 0.5);
  };

  // Guard clause: wait for data to load
  if (!questions || questions.length === 0 || !questions[currQues]) {
    return (
      <div className="quiz">
        <span className="subtitle">Welcome, {name}</span>
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      </div>
    );
  }

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      <div className="quizInfo">
        <span>{questions[currQues]?.category || "Category"}</span>
        <span>Score: {score}</span>
      </div>

      <Question
        name={name}
        currQues={currQues}
        setCurrQues={setCurrQues}
        questions={questions}
        options={options}
        correct={questions[currQues].correct_answer}
        score={score}
        setScore={setScore}
        setUserAnswers={setUserAnswers}
        userAnswers={userAnswers}
        navigate={navigate}
      />
    </div>
  );
};

export default Quiz;
