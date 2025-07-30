import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./Question.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  name,
  setUserAnswers,
  userAnswers // ✅ Accept current answers from Quiz.js
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (!selected) {
      setError("Please select an option first");
      return;
    }

    const updatedAnswers = [
      ...userAnswers,
      {
        question: questions[currQues].question,
        selected,
        correct,
      },
    ];

    setUserAnswers(updatedAnswers);

    // ✅ On last question, go to result page and pass answers
    if (currQues >= 9) {
      navigate("/result", {
        state: {
          name,
          userAnswers: updatedAnswers
        }
      });
    } else {
      setCurrQues(currQues + 1);
      setSelected();
    }
  };

  const handleQuit = () => {
    setCurrQues(0);
    // Optionally clear userAnswers here if needed
    navigate('/');
  };

  return (
    <div className="question">
      <h1>Question {currQues + 1}:</h1>

      <div className="singleQuestion">
        <h2 dangerouslySetInnerHTML={{ __html: questions[currQues].question }} />

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options && options.map((option) => (
            <button
              className={`singleOption ${selected && handleSelect(option)}`}
              key={option}
              onClick={() => handleCheck(option)}
              disabled={!!selected}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          ))}
        </div>

        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={handleQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues >= 9 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Question;
