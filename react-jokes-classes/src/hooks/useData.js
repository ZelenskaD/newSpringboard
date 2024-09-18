import { useState, useEffect } from 'react';
import axios from 'axios';

const useData = (numJokesToGet) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // Add refresh state

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        let jokesArray = [];
        let seenJokes = new Set();

        while (jokesArray.length < numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { ...joke } = res.data;

          if (!seenJokes.has(joke.id)) {
            seenJokes.add(joke.id);
            jokesArray.push({ ...joke, votes: 0 });
          }
        }

        setJokes(jokesArray);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchJokes();
  }, [numJokesToGet, refresh]); // Add refresh to dependencies

  const triggerRefresh = () => {
    setIsLoading(true);
    setRefresh(prev => !prev); // Toggle refresh to refetch jokes
  };

  return [jokes, isLoading, setJokes, setIsLoading, triggerRefresh];
};

export default useData;
