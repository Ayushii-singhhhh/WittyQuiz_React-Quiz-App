import React from 'react';
import './Review.css'; // ✅ We’ll create this CSS file next

const Review = ({ userAnswers }) => {
  return (
    <div className="review">
      <h2>Review Answers</h2>
      {userAnswers.map((item, index) => (
        <div className="review-item" key={index}>
          <h4 dangerouslySetInnerHTML={{ __html: `${index + 1}. ${item.question}` }} />
          <p>
            Your Answer:{" "}
            <span
              style={{
                color: item.selected === item.correct ? "green" : "red",
                fontWeight: "bold",
              }}
              dangerouslySetInnerHTML={{ __html: item.selected }}
            />
          </p>
          {item.selected !== item.correct && (
            <p>
              Correct Answer:{" "}
              <span
                style={{ color: "green", fontWeight: "bold" }}
                dangerouslySetInnerHTML={{ __html: item.correct }}
              />
            </p>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Review;
