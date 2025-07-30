import "./Home.css";
import { MenuItem, TextField, Button } from '@mui/material';
import Categories from '../../Data/Categories';
import React, { useState } from 'react';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate } from 'react-router-dom';

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate('/quiz');
    }
  };

  return (
    <div className='content'>
      <div className='settings'>
        <span style={{ fontSize: 30, marginBottom: 20 }}>Quiz Settings</span>

        <div className="settings__select">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}

          <TextField
            id="user-name"
            name="userName"
            label="Enter Your Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="select-category"
            name="category"
            select
            label="Select Category"
            variant="outlined"
            fullWidth
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="select-difficulty"
            name="difficulty"
            select
            label="Select Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            fullWidth
          >
            <MenuItem key="Easy" value="easy">Easy</MenuItem>
            <MenuItem key="Medium" value="medium">Medium</MenuItem>
            <MenuItem key="Hard" value="hard">Hard</MenuItem>
          </TextField>

          <Button
            id="start-quiz-button"
            name="startQuiz"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="/undraw_online-test_20lm.svg" className="banner" alt="Quiz Illustration" />
    </div>
  );
};

export default Home;

