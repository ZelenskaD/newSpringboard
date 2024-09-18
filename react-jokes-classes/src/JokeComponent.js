
import React from 'react';
import './Joke.css';

const JokeComponent = ({ text, id, votes, vote }) => {
  const handleVote = (delta) => {
    vote(id, delta);
  };

  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={() => handleVote(1)}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={() => handleVote(-1)}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
};

export default JokeComponent;
