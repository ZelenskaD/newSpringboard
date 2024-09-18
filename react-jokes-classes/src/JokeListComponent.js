import React from 'react';
import useData from './hooks/useData';
import JokeComponent from './JokeComponent';
import './JokeList.css';

const JokeList = ({ numJokesToGet = 5 }) => {
  const [jokes, isLoading, setJokes, setIsLoading, triggerRefresh] = useData(numJokesToGet);

  const generateNewJokes = () => {
    triggerRefresh(); // Trigger the refresh to fetch new jokes
  };

  const vote = (id, delta) => {
    setJokes(jokes =>
      jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
      )
    );
  };

  const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {sortedJokes.map(j => (
        <JokeComponent
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={vote}
        />
      ))}
    </div>
  );
};

export default JokeList;

