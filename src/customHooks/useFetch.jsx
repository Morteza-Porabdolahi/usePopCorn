import { useState, useEffect } from "react";

export const useFetch = (initialState, url, ...dependencies) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(function() {
    async function fetchData() {
      try {
        setError('');
        setIsLoading(true);
        
        const res = await fetch(url);

        if (!res.ok) throw new Error('Something went wrong with fetching Data !');

        const data = await res.json();

        if (data.Error) throw new Error(data.Error);

        setData(data);
      } catch (err) {
        console.log(err)
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, ...dependencies]);

  return [data, isLoading, error];
}
