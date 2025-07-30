import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import './Result.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const name = location.state?.name;
  const userAnswers = location.state?.userAnswers || [];

  useEffect(() => {
    if (!name || userAnswers.length === 0) {
      navigate('/');
    }
  }, [name, userAnswers, navigate]);

  // ✅ Calculate correct and incorrect
  const correct = userAnswers.filter(
    (ans) => ans.selected === ans.correct
  ).length;

  const incorrect = userAnswers.length - correct;

  const data = [
    {
      name: 'Quiz Result',
      Correct: correct,
      Incorrect: incorrect,
    },
  ];

  return (
    <div className="result">
      <h1 className="title">FINAL SCORE: {correct}</h1>

      {/* ✅ Bar Chart */}
      <div className="result-chart" style={{ width: '80%', height: 300, marginTop: 30 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Correct" fill="green">
              <LabelList dataKey="Correct" position="right" />
            </Bar>
            <Bar dataKey="Incorrect" fill="red">
              <LabelList dataKey="Incorrect" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Buttons */}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={() => navigate('/')}
      >
        Go To Homepage
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={() => navigate('/review', { state: { userAnswers } })}
      >
        Review Answers
      </Button>
    </div>
  );
};

export default Result;
