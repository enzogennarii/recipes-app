import { useCallback, useState } from 'react';

const useFetch = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { isLoading, error, fetchData };
};

export default useFetch;
