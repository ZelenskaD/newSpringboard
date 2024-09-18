import { useState } from 'react';

const useJoke = (initialVotes = 0) => {
  const [vote, setVote] = useState(initialVotes);

  const increment = () => setVote(vote => vote + 1);
  const decrement = () => setVote(vote => vote - 1);

  return [vote, increment, decrement];
};

export default useJoke;
